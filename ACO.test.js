const ACO = require("./ACO")
const Batch = require("./Batch")
const Formiga = require("./Formiga")
const Instancia = require("./Instancia")
const Job = require("./Job")
const MatrizFeromonio = require("./MatrizFeromonio")
const { Parametros } = require("./Parametros")
const { instanciaTeste } = require("./Testes")

jest.mock('./Parametros')

describe('Teste ACO', function () {

    beforeAll(()=>{
        Parametros.feromonioInicial = 0.1;
        Parametros.alpha = 0.1;
        Parametros.beta = 1.0;
        Parametros.gamma = 0.2;
        Parametros.rho = 0.05;
    })

    it('Testa a montagem da solução dentro da formiga', function () {

        let aco = new ACO(instanciaTeste)
        let formiga = aco.getMelhorSolucaoInfo()
        console.log(`Solução: ${Formiga.imprimeSolucao(formiga.solucao)} com objetivo: ${formiga.qualidade}`)
        expect(formiga).not.toBeFalsy()
        expect(Array.isArray(formiga.solucao)).toBe(true)
        for(let batch of formiga.solucao){
            expect(batch instanceof Batch).toBe(true)
            expect(batch.tamanhoBatch()).toBeLessThanOrEqual(instanciaTeste.numQ)
            for(let job of batch.jobs){
                expect(job instanceof Job).toBe(true)
            }
        }

        expect(typeof formiga.qualidade).toBe('number')
    })

})