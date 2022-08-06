
class Formiga {
    
    solucao = []

    constructor() {

    }

    getFuncaoObjetivo(){
        // Calcula e retorna o valor da função objetivo
        return Math.random()
    }
    
}

// Exporta o módulo pra ficar disponível pro resto do projeto
module.exports = Formiga;