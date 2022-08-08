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


// Exporta coisas que vão ser usadas nos testes automatizados
module.exports = { instanciaTeste, getSolucoesTeste }

