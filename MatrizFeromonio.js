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
     * Calcula a frequencia em que um job é inserido em um batch
     * na iteração atual
     * @param {Array<Formiga>} kMelhoresSolucoes 
     * @returns {} Tabela hash da frequencia
     */
    frequencia(kMelhoresSolucoes){
        const map = new Map();
        for (const formiga of kMelhoresSolucoes){
            for (let batch=0; batch < formiga.solucao.length; batch++){
                for (const job of formiga.solucao[batch]){
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
        freq = frequencia(kMelhoresSolucoes)
        for (let i=0; i<numJobs; i++){
            for (let j=0; j<numBatches; j++){

                evaporacao = (1-Parametros.rho) * T[i][j]
                reforco = instancia.numQ / (kMelhoresSolucoes[0].getFuncaoObjetivo() * 1)

                T[i][j] += reforco + evaporacao
            }
        }
    }
    
}

// Exporta o módulo pra ficar disponível pro resto do projeto
module.exports = MatrizFeromonio;