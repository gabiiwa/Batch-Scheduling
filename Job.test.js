const Job = require("./Job")

describe('Teste da instancia do problema', function () {

    it('Testa se está iniciando o job corretamente', function () {
        
        const job = new Job(0, 1, 2, 3, 4, 5);
        
        expect(job).not.toBeNull()

        expect(job.id).toBe(0)
        expect(job.tempoProcessamento).toBe(1)
        expect(job.prazo).toBe(2)
        expect(job.tamanho).toBe(3)
        expect(job.peso).toBe(4)
        expect(job.dataLancamento).toBe(5)
    })
})