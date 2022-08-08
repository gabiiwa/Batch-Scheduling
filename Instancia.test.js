const Instancia = require("./Instancia")
const Job = require("./Job")
const { Parametros } = require("./Parametros")

jest.mock('./Parametros')

const jobs = [
    new Job(0, 2, 3, 1, 1, 4),
    new Job(1, 2, 2, 1, 1, 0),
    new Job(2, 1, 3, 2, 2, 2),
    new Job(3, 2, 4, 2, 2, 1),
    new Job(4, 3, 2, 3, 1, 0),
    new Job(5, 1, 1, 1, 3, 1)
]

describe('Teste da instancia do problema', function () {

    beforeAll(()=>{
        Parametros.feromonioInicial = 0.1;
        Parametros.alpha = 0.1;
        Parametros.beta = 1.0;
        Parametros.gamma = 0.2;
        Parametros.rho = 0.05;
    })

    it('Testa se está iniciando a instância corretamente', function () {
        
        const instanciaTeste = new Instancia('instancia-teste');
        instanciaTeste.setNumJobs(6)
        instanciaTeste.setNumQ(4)
        instanciaTeste.addJob(jobs[0])
        instanciaTeste.addJob(jobs[1])
        instanciaTeste.addJob(jobs[2])
        instanciaTeste.addJob(jobs[3])
        instanciaTeste.addJob(jobs[4])
        instanciaTeste.addJob(jobs[5])
        
        expect(instanciaTeste).not.toBeNull()
        expect(instanciaTeste.nomeArtigo).toBe('instancia-teste')
        expect(instanciaTeste.numJobs).toBe(6)
        expect(instanciaTeste.numQ).toBe(4)
        expect(instanciaTeste.jobs).toStrictEqual(jobs)
    })
})