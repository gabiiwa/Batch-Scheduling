const Parametros = {
    numeroDeFormigas: 50,
    // Feromonio
    feromonioInicial: 1.1,
    // Função de probabilidade
    alpha: 0.1,
    beta: 0.5,
    // Atualizacao do feromônio
    gamma: 0.2, // Pega 20% das melhores soluções pra mandar pra atualização da matriz
    // Evaporação
    rho: 0.05,
    // Número de vezes que se aceita iterar sem melhora 
    num_semMelhora: 50,
}

// Exporta o módulo pra ficar disponível pro resto do projeto
module.exports = {Parametros};