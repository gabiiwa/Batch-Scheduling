const Batch = require("./Batch");
const Formiga = require("./Formiga")
const MatrizFeromonio = require("./MatrizFeromonio")
const { Parametros } = require("./Parametros")

class ACO {
    
    melhorSolucao = []
    funcaoObjetivo = 0

    /**
     * Inicia o ACO com a instância fornecida
     * @param {Instancia} instancia 
     */
    constructor(instancia) {

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