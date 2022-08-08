const Batch = require("./Batch")
const Job = require("./Job")

const jobs = [
    new Job(0, 2, 3, 1, 1, 4), // 0
    new Job(1, 2, 2, 1, 1, 0), // 1
    new Job(2, 1, 3, 2, 2, 2), // 2
    new Job(3, 2, 4, 2, 2, 1), // 3
    new Job(4, 3, 2, 3, 1, 0), // 4
    new Job(5, 1, 1, 1, 3, 1)  // 5
]

describe('Teste do batch', function () {

    it('Testa se está iniciando o batch corretamente', function () {
        
        const batchVazio = new Batch();
        const batch = new Batch([jobs[1], jobs[3]]);
        
        expect(batch).not.toBeNull()
        expect(batch.jobs).toStrictEqual([jobs[1], jobs[3]])
        expect(batchVazio).not.toBeNull()
        expect(batchVazio.jobs.length).toBe(0)
    })

    it('Testa se está adicionando um job corretamente', function () {
        
        const batch = new Batch([jobs[1], jobs[3]]);

        batch.addJob(jobs[5])
        
        expect(batch).not.toBeNull()
        expect(batch.jobs).toStrictEqual([jobs[1], jobs[3], jobs[5]])
    })

    it('Testa se está obtendo a data de lançamento do batch corretamente', function () {
        
        const batch = new Batch([jobs[1], jobs[3], jobs[5]]);

        expect(batch).not.toBeNull()
        expect(batch.getDataLancamentoBatch()).toBe(1)
    })

    it('Testa se está obtendo o tempo de processamento do batch corretamente', function () {
        
        const batch = new Batch([jobs[1], jobs[3], jobs[5]]);

        expect(batch).not.toBeNull()
        expect(batch.getTempoProcessamentoBatch()).toBe(2)
    })

    it('Testa se está obtendo o tamanho do batch corretamente', function () {
        
        const batch = new Batch([jobs[1], jobs[3], jobs[5]]);

        expect(batch).not.toBeNull()
        expect(batch.tamanhoBatch()).toBe(4)
    })
})