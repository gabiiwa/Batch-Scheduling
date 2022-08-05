const Formiga = require("./Formiga");
const Instancia = require("./Instancia");
const { Parametros } = require("./Parametros");

class MatrizFeromonio {

    T = [[]]

    constructor() {

    }

    /**
     * Calcula a frequencia em que um job é inserido em um batch
     * na iteração atual
     * @param {Array<Formiga>} kMelhoresSolucoes 
     * @returns {} Tabela hash da frequencia
     */
    frequencia(kMelhoresSolucoes){

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
                reforco = instancia.numQ / (kMelhoresSolucoes[0].getFuncaoObjetivo() * )

                T[i][j] += reforco + evaporacao
            }
        }
    }
    
}

// Exporta o módulo pra ficar disponível pro resto do projeto
module.exports = MatrizFeromonio;