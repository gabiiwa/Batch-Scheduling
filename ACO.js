const Batch = require("./Batch");
const Formiga = require("./Formiga")
const MatrizFeromonio = require("./MatrizFeromonio")
const { Parametros } = require("./Parametros")

class ACO {
    
    melhorSolucao = []
    funcaoObjetivo = 0
    array_formigas = []

    /**
     * Inicia o ACO com a instância fornecida
     * @param {Instancia} instancia 
     */
    constructor(instancia) {
        let matrizFeromonio = new MatrizFeromonio(instancia.numJobs)
        let cont = 0
        while(cont < Parametros.num_semMelhora){
            for(let j=0; j<Parametros.numeroDeFormigas; j++){
                let formiga = new Formiga(matrizFeromonio,instancia)
                formiga.insereSolucao()
                this.array_formigas.push(formiga)
            }
            let formigas_ordenadas = this.array_formigas.sort((a, b) => {
                return a.getFuncaoObjetivo() - b.getFuncaoObjetivo()
            })
            let delete_count = Math.round(formigas_ordenadas.length*Parametros.gamma)
            let k = formigas_ordenadas.splice(0,delete_count)
            matrizFeromonio.atualizaFeromonio(k,instancia)
            console.log(k[0].getFuncaoObjetivo())
            if(this.funcaoObjetivo!=0){
                if(this.funcaoObjetivo>k[0].getFuncaoObjetivo()){
                    this.funcaoObjetivo=k[0].getFuncaoObjetivo()
                    this.melhorSolucao=k[0].solucao
                }
                else if(this.funcaoObjetivo-k[0].getFuncaoObjetivo()<0.1){
                    cont+=1
                }
            }
            else{
                this.funcaoObjetivo=k[0].getFuncaoObjetivo()
                this.melhorSolucao=k[0].solucao
            }
        }
    }
    
    /**
     * Retorna a melhor solução encontrada e a sua qualidade (valor da função objetivo)
     * @returns {{solucao: Array<Batch>, qualidade: number}}
     */
    getMelhorSolucaoInfo(){
        return {
            solucao: this.melhorSolucao,
            qualidade: this.funcaoObjetivo
        }
    }
}

// Exporta o módulo pra ficar disponível pro resto do projeto
module.exports = ACO;