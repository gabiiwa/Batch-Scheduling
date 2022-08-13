const Parametros = {
    // Diretorio fonte das instâncias
    diretorioInstancias: './data',
    // Número de execuções do ACO
    numExecucoes: 10,
    // Limite de instâncias na index usado para debug. Colocar -1 para desabilitar
    // A intenção é rodar só as primeiras n instâncias quando estiver testando.
    limiteInstanciasRodar: -1,
    // Taxa de decaimento do beta, que diminui a influência da heuristica com o tempo
    taxa_decai_beta: 0.1,
    //numero de formigas
    numeroDeFormigas: 200,
    // Feromonio
    feromonioInicial: 1.1,
    // Função de probabilidade
    alpha: 1.0, // Altera força do feromônio
    beta: 0.6,   // Altera força da heurística
    // Atualizacao do feromônio
    gamma: 0.05, // Pega 5% das melhores soluções pra mandar pra atualização da matriz
    // Evaporação
    rho: 0.05,
    // Número de vezes que se aceita iterar sem melhora 
    num_semMelhora: 250,
}

// Exporta o módulo pra ficar disponível pro resto do projeto
module.exports = {Parametros};