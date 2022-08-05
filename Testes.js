console.log('----- Testa o carregamento das instancias -----')

const CarregaInstancias = require('./CarregaInstancias')
const Formiga = require('./Formiga')
const Job = require('./Job')

const inst = new CarregaInstancias()

//console.log(inst.instancias)

console.log('----- Testa a matriz de feromonio -----')

const MatrizFeromonio = require('./MatrizFeromonio')

const instMatriz = new MatrizFeromonio(6,3)

let solucaoTeste = []
let formiga1 = new Formiga()
let formiga2 = new Formiga()
let formiga3 = new Formiga()
let formiga4 = new Formiga()
formiga1.solucao = [[new Job(1),new Job(2),new Job(3)],[new Job(4)],[new Job(5),new Job(6)]]
formiga2.solucao = [[new Job(2),new Job(3),new Job(1)],[new Job(6),new Job(5)],[new Job(4)]]
formiga3.solucao = [[new Job(2),new Job(6),new Job(4)],[new Job(3)],[new Job(1),new Job(5)]]
formiga4.solucao = [[new Job(5),new Job(1),new Job(6)],[new Job(3),new Job(4)],[new Job(2)]]
solucaoTeste.push(formiga1)
solucaoTeste.push(formiga2)
solucaoTeste.push(formiga3)
solucaoTeste.push(formiga4)

let hashmap = instMatriz.frequencia(solucaoTeste)
console.log("Frequencia do job 1 no batch 0:", hashmap.get('1-0'))
console.log(hashmap)