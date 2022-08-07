const Formiga = require("./Formiga");
const Instancia = require("./Instancia");
const { Parametros } = require("./Parametros");

class MatrizFeromonio {

    T = [[]]
    numJobs=0
    numBatches=0

    constructor(numJobs, numBatches) {
        this.numJobs = numJobs
        this.numBatches = numBatches
        
        // Inicializa a matriz T dos feromônios
        this.T = new Array(numJobs);
        for (let i=0; i<numJobs; i++){
            this.T[i] = new Array(numBatches);
            for (let j=0; j<numBatches; j++){
                this.T[i][j] = Parametros.feromonioInicial
            }
        }
    }

    /**
     * Obtem o valor do feromônio para o caminho representado por um
     * job e um batch
     * @param {number} jobId Id do job
     * @param {number} batchId Indice do batch dentro do array da solução
     * @returns {number} Valor do feromônio
     */
    getFeromonio(jobId, batchId){

        if(this.numBatches < (batchId+1)){
            // insere uma coluna na matriz se o batch solicitado
            // não estiver na matriz
            for (let i=0; i<numJobs; i++){
                this.T[i].push(Parametros.feromonioInicial)
            }
            this.numBatches++
        }

        return this.T[jobId][batchId]
    }

    /**
     * Calcula a frequencia em que um job é inserido em um batch
     * na iteração atual
     * @param {Array<Formiga>} kMelhoresSolucoes 
     * @returns {} Tabela hash da frequencia
     */
    frequencia(kMelhoresSolucoes){
        const map = new Map();
        for (const formiga of kMelhoresSolucoes){
            for (let batch=0; batch < formiga.solucao.length; batch++){
                for (const job of formiga.solucao[batch].jobs){
                    // Define o formato da chave do hashmap
                    const chave = `${job.id}-${batch}`
                    if(map.has(chave)){
                        // Se já tá no hashmap, acresenta na frequencia
                        map.set(chave, map.get(chave) + 1)
                    } else {
                        // Se não está no hashmap, cria uma nova chave
                        map.set(chave, 1)
                    }
                }
            }
        }
        return map
    }

    /**
     * Calcula a evaporação e reforço do feromônio na matriz
     * @param {Array<Formiga>} kMelhoresSolucoes 
     * @param {Instancia} instancia
     */
    atualizaFeromonio(kMelhoresSolucoes, instancia){
        // φij(t + 1) = (1 − ρ) ∗ φxj(t) + Q/TWT(s) ∗ mxj(t)
        let map = this.frequencia(kMelhoresSolucoes)
        for (let i=0; i<this.numJobs; i++){
            for (let j=0; j<this.numBatches; j++){
                const chave = `${i}-${j}`
                let freq = 0
                if(map.has(chave)){
                    freq = map.get(chave)
                }
                let evaporacao = (1-Parametros.rho) * this.T[i][j]
                let reforco = 0
                if(freq !== 0){
                    reforco = instancia.numQ / (kMelhoresSolucoes[0].getFuncaoObjetivo() * freq)
                }

                this.T[i][j] = reforco + evaporacao
            }
        }
    }
    
}

// Exporta o módulo pra ficar disponível pro resto do projeto
module.exports = MatrizFeromonio;