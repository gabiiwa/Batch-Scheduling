const fs = require('fs');
const Formiga = require('./Formiga')
const Job = require('./Job')
const Batch = require('./Batch')
const Instancia = require('./Instancia')

// Instância do artigo de referência
const instanciaTeste = new Instancia('instancia-teste');
instanciaTeste.setNumJobs(6)
instanciaTeste.setNumQ(4)
instanciaTeste.addJob(new Job(0, 2, 3, 1, 1, 4))
instanciaTeste.addJob(new Job(1, 2, 2, 1, 1, 0))
instanciaTeste.addJob(new Job(2, 1, 3, 2, 2, 2))
instanciaTeste.addJob(new Job(3, 2, 4, 2, 2, 1))
instanciaTeste.addJob(new Job(4, 3, 2, 3, 1, 0))
instanciaTeste.addJob(new Job(5, 1, 1, 1, 3, 1))

/**
 * Cria um conjunto de 4 soluções para os testes automatizados
 * @param {MatrizFeromonio} matrizFeromonio 
 * @returns {Array<Formiga>}
 */
function getSolucoesTeste(matrizFeromonio) {
    let solucoesTeste = []; 
    let formiga1 = new Formiga(matrizFeromonio, instanciaTeste)
    let formiga2 = new Formiga(matrizFeromonio, instanciaTeste)
    let formiga3 = new Formiga(matrizFeromonio, instanciaTeste)
    let formiga4 = new Formiga(matrizFeromonio, instanciaTeste)
    formiga1.solucao = [
        new Batch([instanciaTeste.jobs[0], instanciaTeste.jobs[1], instanciaTeste.jobs[2]]),
        new Batch([instanciaTeste.jobs[3]]),
        new Batch([instanciaTeste.jobs[4], instanciaTeste.jobs[5]])
    ]
    formiga2.solucao = [
        new Batch([instanciaTeste.jobs[1], instanciaTeste.jobs[2], instanciaTeste.jobs[0]]),
        new Batch([instanciaTeste.jobs[5], instanciaTeste.jobs[4]]),
        new Batch([instanciaTeste.jobs[3]])
    ]
    formiga3.solucao = [
        new Batch([instanciaTeste.jobs[1], instanciaTeste.jobs[5], instanciaTeste.jobs[3]]),
        new Batch([instanciaTeste.jobs[2]]),
        new Batch([instanciaTeste.jobs[0], instanciaTeste.jobs[4]])
    ]
    formiga4.solucao = [
        new Batch([instanciaTeste.jobs[4], instanciaTeste.jobs[0], instanciaTeste.jobs[5]]),
        new Batch([instanciaTeste.jobs[2], instanciaTeste.jobs[3]]),
        new Batch([instanciaTeste.jobs[1]])
    ]
    solucoesTeste.push(formiga1)
    solucoesTeste.push(formiga2)
    solucoesTeste.push(formiga3)
    solucoesTeste.push(formiga4)

    // Ordena as soluções da menor pra maior
    solucoesTeste = solucoesTeste.sort((a, b) => {
        return a.getFuncaoObjetivo() - b.getFuncaoObjetivo()
    })

    //retorna uma cópia
    return [...solucoesTeste];
}

/**
 * Carrega uma instância e retorna a classe dela
 * @param {string} nome_artigo Nome da instância no artigo
 * @param {string} caminho_arquivo caminho do arquivo no sistema
 */
function carregaInstanciaTeste(nome_artigo, caminho_arquivo) {
        
    //faz a leitura do arquivo da instancia
    let dataBuffer = fs.readFileSync(caminho_arquivo);
    const linhas = dataBuffer.toString().split('\n');
    const instancia = new Instancia(nome_artigo)
    let i = 0;
    
    //anda pelas linhas do arquivo da instância
    for (const line of linhas) {
        const ls = line.trim() // Elimina espaços vazios e quebras de linha
        let lsArr = ls.split(' ') // Quebra linha em um array usando os espaços como separador
        lsArr = lsArr.filter(x => x !== '') // Elimina os itens do array com strings vazias
        lsArr = lsArr.map(x => parseInt(x)) // Converte strings em inteiros
        if (i === 0) {
            instancia.setNumJobs(lsArr[0])
        } else if (i === 1) {
            instancia.setNumQ(lsArr[0])
        } else if (lsArr.length === 5) {
            instancia.addJob(new Job(
                i-2,      // id
                lsArr[0], // p
                lsArr[1], // d
                lsArr[2], // s
                lsArr[3], // w
                lsArr[4], // r
            ))
        }
        i++;
    }

    return instancia;
}

/**
 * Função estática que imprime a solução vinda diretamente ou obtida de uma formiga
 * @param {Array<Batch>|Formiga} solucao solução ou formiga com a solução
 */
function imprimeSolucao(solucao){
    let sol = []
    let sol_batches = []

    if(solucao.solucao){
        sol = solucao.solucao
    } else {
        sol = solucao
    } 
    for(let batch of sol){
        let jobsIds = []
        for(let job of batch.jobs){
            jobsIds.push(job.id)
        }
        sol_batches.push(`{${jobsIds.join(',')}}`)
    }

    return `(${sol_batches.join(',')})`
}

// Exporta coisas que vão ser usadas nos testes automatizados
module.exports = { instanciaTeste, getSolucoesTeste, carregaInstanciaTeste, imprimeSolucao }

