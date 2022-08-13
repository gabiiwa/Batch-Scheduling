const Batch = require("./Batch")
const Instancia = require("./Instancia")
const Job = require("./Job")
const MatrizFeromonio = require("./MatrizFeromonio")
const { Parametros } = require("./Parametros")

class Formiga {
    
    solucao = []
    listaDeCandidatos = []
    instancia = null
    beta_aco = 0
    /**
     * @param {MatrizFeromonio} matrizFeromonio Instância da matriz de feromônios 
     * @param {number} beta_aco
     * @param {Instancia} instancia Instancia da classe que contem os dados do arquivo da instância do dataset
     */
    constructor(matrizFeromonio,beta_aco, instancia) {
        this.beta_aco=beta_aco
        this.instancia = instancia
        this.matrizFeromonio = matrizFeromonio
        // Faz uma copia da lista de jobs da instância
        this.listaDeCandidatos = [...instancia.jobs]
        // Inicializa a solução com um batch vazio
        this.solucao = [new Batch()]
    } 


    ////////// Construção da solução //////////////

    /**
     * Sorteia um job da lista de candidatos pra entrar no batch atual
     * @returns {Job}
     */
    sorteiaUmJob(){
        //https://pt.stackoverflow.com/questions/147884/sorteio-aleat%C3%B3rio-mas-com-diferentes-probabilidades
        
        let x = Math.random()
        let prob = this.getProbabilidade()

        for(let [key,value] of Object.entries(prob)){
            x = x - value
            if(x<=0){
                let id_job_retirar = this.listaDeCandidatos.findIndex((job)=>{
                    return job.id==key
                })
                let job_sol = this.listaDeCandidatos.splice(id_job_retirar,1)
                return job_sol[0]
            }
        }
    }

    /**
     * Insere um job de acordo com a capacidade da máquina
     * @param
     */
    insereSolucao(){
        while(this.listaDeCandidatos.length!=0){
            let job_entra = this.sorteiaUmJob()
            let tam_batch_novo = this.solucao[this.solucao.length-1].tamanhoBatch()+job_entra.tamanho
            if(tam_batch_novo<=this.instancia.numQ){
                this.solucao[this.solucao.length-1].addJob(job_entra)
            }
            else{
                this.solucao.push(new Batch([job_entra]))
            }
        }
    }
    /**
     * Retorna o valor da probalidade 
     * @param {number} iteracao
     */
     getProbabilidade(){
        let heuristica = this.getHeuristica()
        let p_down = 0
        let p = {}
        
        // Calcula a parte de baixo da fração
        for(let i=0;i < this.listaDeCandidatos.length;i++){
            let batchId = this.solucao.length -1
            let jobId = this.listaDeCandidatos[i].id
            p_down += (Math.pow(this.matrizFeromonio.getFeromonio(jobId,batchId),Parametros.alpha))*Math.pow(heuristica.valores[i],this.beta_aco)
        }
        for(let i=0;i < this.listaDeCandidatos.length;i++){
            let batchId = this.solucao.length -1
            let jobId = this.listaDeCandidatos[i].id
            let p_up = (Math.pow(this.matrizFeromonio.getFeromonio(jobId,batchId),Parametros.alpha))*Math.pow(heuristica.valores[i],this.beta_aco)
    
            p[jobId] = p_up/p_down
        }
        return p
        
    }


    // {
    //     0: 0.11,
    //     1: 0.17,
    //     2: 0.11
    // }
    /**
     * Retorna a lista dos valores da heuristica para a lista de candidatos
     * @returns {{valores: Array<number>, soma: number}}
     */
    getHeuristica(){
        let valores = []
        let soma = 0
        for(let job of this.listaDeCandidatos){
            let h = 1 / job.prazo
            valores.push(h)
            soma += Math.pow(h,Parametros.beta)
        }
        return {valores, soma} 
    }

    ///////////// Função objetivo /////////////////

    getFuncaoObjetivo(){
        // Calcula e retorna o valor da função objetivo
        // L = solucao
        // Tj = max {0, Cj − dj }
        // T W T (L) = ∑j∈J Job.peso_j Tj
        
        let atraso_total = 0
        for(let i=0; i < this.solucao.length; i++){
            let batch_i = this.solucao[i]
            let C_i = this.tempoConclusao()[i]
            for(let j=0; j < batch_i.jobs.length; j++){
                let job_j = batch_i.jobs[j]
                atraso_total += job_j.peso*this.atraso(C_i,job_j.prazo)
            }
            
        }

        // let atraso = Math.random();
        return atraso_total
    }

    /**
     * Retorna o atraso(T_j) de um batch j
     * @param {Formiga.tempoConclusao} C
     * @param {Job.prazo} d
     */
    atraso(C,d){
        return Math.max(0,C-d)
    }

    /**
     * Retorna a data em que o batch vai concluir seu processamento
     * 
     */
    tempoConclusao(){
        // C(Bi) = max {r(Bi), C(Bi−1)} + p(Bi)
        let C = new Array(this.solucao.length).fill(0)
        
        for(var i=0; i<this.solucao.length;i++){
            let max =this.solucao[i].getDataLancamentoBatch()
            if(i!=0){
                max = Math.max(this.solucao[i].getDataLancamentoBatch(),C[i-1])
            } 
            C[i] = max+this.solucao[i].getTempoProcessamentoBatch()
        }
        return C
    }

    
    // B = ({2, 4, 6},{3},{1, 5})

    // Equações
    // p(Bi) = max j ∈ Bi {pj }
    // C(B0) = r(B0) + p(B0)
    // C(Bi) = max {r(Bi), C(Bi−1)} + p(Bi) 
    // r(Bi) = max j ∈ Bi {Job.dataLancamento j };
    // Tj = max {0, Cj − dj }
    // TWT (L) = ∑j∈J Job.peso_j Tj

    // calculo do tempo de conclusão
    // r(B0) = max {0,1,1} = 1
    // p(B0) = max j ∈ B0 {2,2,1} = 2
    // C(B0) = 1 + 2 = 3
    
    // r(B1) = max {2} = 2
    // p(B1) = max j ∈ B1 {1} = 1
    // C(B1) = max {2, 3} + 1 = 4

    // r(B2) = max {4,0} = 4
    // p(B2) = max j ∈ B2 {2,3} = 3
    // C(B2) = max {4, 4} + 3 = 7

    // calculo da função objetivo
    // T0 = max {0, 7 − 3 } = 4
    // T1 = max {0, 3 − 2 } = 1
    // T2 = max {0, 4 − 3 } = 1
    // T3 = max {0, 3 − 4 } = 0
    // T4 = max {0, 7 − 2 } = 5
    // T5 = max {0, 3 − 1 } = 2

    // WT (B) = j∈J wj Tj = (w1 T1 + w3 T3 + w5 T5) + (w2 T2) + (w0 T0 + w4 T4) = 18
    // WT (B) = j∈J wj Tj = (1 * 1 + 2 * 0 + 3 * 2) + (2 * 1) + (1 * 4 + 1 * 5) = 18
    
}

// Exporta o módulo pra ficar disponível pro resto do projeto
module.exports = Formiga;