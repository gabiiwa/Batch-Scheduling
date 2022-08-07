
const CarregaInstancias = require('./CarregaInstancias')
const Formiga = require('./Formiga')
const Job = require('./Job')
const Batch = require('./Batch')
const Instancia = require('./Instancia')

//console.log('----- Testa o carregamento das instancias -----')
//const inst = new CarregaInstancias()

//console.log(inst.instancias)

console.log('----- Testa a classe da Instancia -----')

const instanciaTeste = new Instancia('instancia-teste');
instanciaTeste.setNumJobs(6)
instanciaTeste.setNumQ(4)
instanciaTeste.addJob(new Job(0, 2, 3, 1, 1, 4))
instanciaTeste.addJob(new Job(1, 2, 2, 1, 1, 0))
instanciaTeste.addJob(new Job(2, 1, 3, 2, 2, 2))
instanciaTeste.addJob(new Job(3, 2, 4, 2, 2, 1))
instanciaTeste.addJob(new Job(4, 3, 2, 3, 1, 0))
instanciaTeste.addJob(new Job(5, 1, 1, 1, 3, 1))

//console.log('dados da instância:', instanciaTeste)

console.log('----- Testa a classe do Batch -----')

const batchTeste = new Batch([
    instanciaTeste.jobs[1], // 2
    instanciaTeste.jobs[3] // 4
])

//console.log('batchTeste.addJob antes', batchTeste.jobs)
batchTeste.addJob(instanciaTeste.jobs[5]) // 6
//console.log('batchTeste.addJob depois', batchTeste.jobs)

console.log('Data de lançamento do batch:',batchTeste.getDataLancamentoBatch())

console.log('----- Testa a formiga -----')

let formigaTeste = new Formiga()
formigaTeste.solucao = [
    new Batch([
        instanciaTeste.jobs[1], // 2
        instanciaTeste.jobs[3], // 4
        instanciaTeste.jobs[5]  // 6
    ]),
    new Batch([
        instanciaTeste.jobs[2], // 3
    ]),
    new Batch([
        instanciaTeste.jobs[0], // 1
        instanciaTeste.jobs[4], // 5
    ])
]

console.log('Tempo de conclusão do batch 0:',formigaTeste.tempoConclusao())
console.log('Tempo de conclusão do batch 1:',formigaTeste.tempoConclusao())

console.log('Função objetivo da formigaTeste:', formigaTeste.getFuncaoObjetivo())

console.log('----- Testa a matriz de feromonio -----')

const MatrizFeromonio = require('./MatrizFeromonio')

const instMatriz = new MatrizFeromonio(6,3)

let solucaoTeste = []
let formiga1 = new Formiga(instMatriz)
let formiga2 = new Formiga(instMatriz)
let formiga3 = new Formiga(instMatriz)
let formiga4 = new Formiga(instMatriz)
formiga1.solucao = [
    new Batch([instanciaTeste.jobs[0],instanciaTeste.jobs[1],instanciaTeste.jobs[2]]),
    new Batch([instanciaTeste.jobs[3]]),
    new Batch([instanciaTeste.jobs[4],instanciaTeste.jobs[5]])
]
formiga2.solucao = [
    new Batch([instanciaTeste.jobs[1],instanciaTeste.jobs[2],instanciaTeste.jobs[0]]),
    new Batch([instanciaTeste.jobs[5],instanciaTeste.jobs[4]]),
    new Batch([instanciaTeste.jobs[3]])
]
formiga3.solucao = [
    new Batch([instanciaTeste.jobs[1],instanciaTeste.jobs[5],instanciaTeste.jobs[3]]),
    new Batch([instanciaTeste.jobs[2]]),
    new Batch([instanciaTeste.jobs[0],instanciaTeste.jobs[4]])
]
formiga4.solucao = [
    new Batch([instanciaTeste.jobs[4],instanciaTeste.jobs[0],instanciaTeste.jobs[5]]),
    new Batch([instanciaTeste.jobs[2],instanciaTeste.jobs[3]]),
    new Batch([instanciaTeste.jobs[1]])
]
solucaoTeste.push(formiga1)
solucaoTeste.push(formiga2)
solucaoTeste.push(formiga3)
solucaoTeste.push(formiga4)

// Ordena as soluções da menor pra maior
solucaoTeste = solucaoTeste.sort((a, b) => {
    return a.getFuncaoObjetivo() - b.getFuncaoObjetivo()
})
// Teste da frequencia dos caminhos

let hashmap = instMatriz.frequencia(solucaoTeste)
console.log("Frequencia do job 1 no batch 0:", hashmap.get('1-0'))
console.log("Frequencia do job 1 no batch 1:", hashmap.get('1-1'))
//console.log(hashmap)

/////// Teste da atualização do feromônio

let instancia = {
    numQ: 4
}
console.log('Antes da atualização', instMatriz.T)
instMatriz.atualizaFeromonio(solucaoTeste, instancia)
console.log('Depois da atualização', instMatriz.T)


