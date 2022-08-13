const Batch = require("./Batch")
const Formiga = require("./Formiga")
const Instancia = require("./Instancia")
const Job = require("./Job")
const MatrizFeromonio = require("./MatrizFeromonio")
const { Parametros } = require("./Parametros")
const { instanciaTeste, imprimeSolucao } = require("./Testes")

jest.mock('./Parametros')

describe('Teste da formiga', function () {

    beforeAll(()=>{
        Parametros.feromonioInicial = 0.1;
        Parametros.alpha = 0.1;
        Parametros.beta = 1.0;
        Parametros.gamma = 0.2;
        Parametros.rho = 0.05;
    })

    it('Testa se está iniciando a formiga corretamente', function () {
        const matrizFeromonio = new MatrizFeromonio(6,3)
        const formiga = new Formiga(matrizFeromonio, instanciaTeste);

        expect(formiga).not.toBeFalsy()
        expect(Array.isArray(formiga.solucao)).toBe(true)
        expect(Array.isArray(formiga.listaDeCandidatos)).toBe(true)

        expect(formiga.solucao.length).toBeGreaterThan(0)
        expect(formiga.listaDeCandidatos.length).toBeGreaterThan(0)
        expect(formiga.listaDeCandidatos).toStrictEqual(instanciaTeste.jobs)

        expect(formiga.solucao[0] instanceof Batch).toBe(true)
        expect(formiga.listaDeCandidatos[0] instanceof Job).toBe(true)
    })

    it('Testa se a heuristica está sendo calculada corretamente', function () {
        const matrizFeromonio = new MatrizFeromonio(6,3)
        const formiga = new Formiga(matrizFeromonio, instanciaTeste);
        const {valores, soma} = formiga.getHeuristica()
        expect(formiga).not.toBeFalsy()
        expect(valores).toStrictEqual([
            1/3,
            1/2,
            1/3,
            1/4,
            1/2,
            1,
        ])
        expect(soma).toBeCloseTo(2.915, 2)
    })

    it('Testa se a função objetivo está sendo calculada corretamente', function () {
        const matrizFeromonio = new MatrizFeromonio(6,3)
        const formiga = new Formiga(matrizFeromonio, instanciaTeste);
        formiga.solucao = [
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
        const objetivo = formiga.getFuncaoObjetivo()
        expect(objetivo).not.toBeFalsy()
        expect(objetivo).toBeCloseTo(18, 2)
    })

    it('Testa se o tempo de conclusão está sendo calculado corretamente', function () {
        const matrizFeromonio = new MatrizFeromonio(6,3)
        const formiga = new Formiga(matrizFeromonio, instanciaTeste);
        formiga.solucao = [
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
        const valores = formiga.tempoConclusao()
        expect(formiga).not.toBeFalsy()
        expect(valores).toStrictEqual([3, 4, 7])
    })

    it('Testa se a função de probabilidade está sendo calculada corretamente', function () {
        const matrizFeromonio = new MatrizFeromonio(6,3)
        const formiga = new Formiga(matrizFeromonio, instanciaTeste);
        formiga.solucao = [
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
        const valores = formiga.getProbabilidade()
        expect(formiga).not.toBeFalsy()
        expect(valores['0']).toBeCloseTo(0.11, 2)
        expect(valores['1']).toBeCloseTo(0.17, 2)
        expect(valores['2']).toBeCloseTo(0.11, 2)
        expect(valores['3']).toBeCloseTo(0.09, 2)
        expect(valores['4']).toBeCloseTo(0.17, 2)
        expect(valores['5']).toBeCloseTo(0.34, 2)

    })

    it('Testa se a função de escolher um job aleatoriamente funciona corretamente', function () {
        const matrizFeromonio = new MatrizFeromonio(6,3)
        const formiga = new Formiga(matrizFeromonio, instanciaTeste);

        const job = formiga.sorteiaUmJob()
        expect(job).not.toBeFalsy()
        expect(job instanceof Job).toBe(true)
        expect(formiga.listaDeCandidatos.includes(job)).toBe(false)
    })

    it('Testa a montagem da solução dentro da formiga', function () {
        const matrizFeromonio = new MatrizFeromonio(6,3)
        const formiga = new Formiga(matrizFeromonio, instanciaTeste);

        formiga.insereSolucao()
        expect(formiga.solucao).not.toBeFalsy()
        for(let batch of formiga.solucao){
            expect(batch instanceof Batch).toBe(true)
            expect(batch.tamanhoBatch()).toBeLessThanOrEqual(instanciaTeste.numQ)
            for(let job of batch.jobs){
                expect(job instanceof Job).toBe(true)
            }
        }

        expect(formiga.listaDeCandidatos.length).toBe(0)
    })

    it('Imprime uma solução no formato do artigo com solução vinda de um array', function () {
        const solucao = [
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

        expect(Formiga.imprimeSolucao(solucao)).toBe('({1,3,5},{2},{0,4})')
    })

    it('Imprime uma solução no formato do artigo com solução vinda de uma formiga', function () {
        const matrizFeromonio = new MatrizFeromonio(6,3)
        const formiga = new Formiga(matrizFeromonio, instanciaTeste);
        formiga.solucao = [
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

        expect(imprimeSolucao(formiga)).toBe('({1,3,5},{2},{0,4})')
    })
})