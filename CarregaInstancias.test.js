const CarregaInstancias = require('./CarregaInstancias');
const Instancia = require('./Instancia');
const Job = require('./Job');

describe('Teste do carregador de instâncias', function () {

    it('Testa se está iniciando o job corretamente', function () {
        const inst = new CarregaInstancias();
        
        expect(inst).not.toBeNull()
        expect(Array.isArray(inst.instancias)).toBe(true)
        expect(inst.instancias.length).toBeGreaterThan(0)
        expect(inst.instancias[0] instanceof Instancia).toBe(true)
        expect(typeof inst.instancias[0].nomeArtigo).toBe('string')
        expect(typeof inst.instancias[0].numJobs).toBe('number')
        expect(typeof inst.instancias[0].numQ).toBe('number')
        expect(Array.isArray(inst.instancias[0].jobs)).toBe(true)
        expect(inst.instancias[0].jobs.length).toBeGreaterThan(0)
        expect(inst.instancias[0].jobs[0] instanceof Job).toBe(true)
        expect(typeof inst.instancias[0].jobs[0].id).toBe('number')
        expect(typeof inst.instancias[0].jobs[0].tempoProcessamento).toBe('number')
        expect(typeof inst.instancias[0].jobs[0].tamanho).toBe('number')
        expect(typeof inst.instancias[0].jobs[0].dataLancamento).toBe('number')
        expect(typeof inst.instancias[0].jobs[0].prazo).toBe('number')
        expect(typeof inst.instancias[0].jobs[0].peso).toBe('number')
    })
})