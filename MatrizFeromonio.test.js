const MatrizFeromonio = require("./MatrizFeromonio")
const { Parametros } = require("./Parametros")
const { getSolucoesTeste, instanciaTeste } = require("./Testes")

jest.mock('./Parametros')

describe('Teste da matriz de feromônios', function () {

    beforeAll(()=>{
        Parametros.feromonioInicial = 0.1;
        Parametros.alpha = 0.1;
        Parametros.beta = 1.0;
        Parametros.gamma = 0.2;
        Parametros.rho = 0.05;
    })
    
    it('Testa se está instanciando corretamente', function () {
        const instMatriz = new MatrizFeromonio(6,3)
        const p = Parametros.feromonioInicial
        expect(instMatriz).not.toBeNull()
        expect(instMatriz.numJobs).toBe(6)
        expect(instMatriz.numBatches).toBe(3)
        expect(instMatriz.T).toStrictEqual([
            new Array(3).fill(p),
            new Array(3).fill(p),
            new Array(3).fill(p),
            new Array(3).fill(p),
            new Array(3).fill(p),
            new Array(3).fill(p)
        ])
    })

    it('Obtem o feromônio de um batch que já esteja na matriz', function () {
        const instMatriz = new MatrizFeromonio(6,3)
        const p = Parametros.feromonioInicial
        const feromonio = instMatriz.getFeromonio(2,3)
        expect(instMatriz).not.toBeNull();
        expect(feromonio).not.toBeNull();
        expect(feromonio).toBe(p)
        expect(instMatriz.numJobs).toBe(6)
        expect(instMatriz.numBatches).toBe(4)
        expect(instMatriz.T).toStrictEqual([
            new Array(4).fill(p),
            new Array(4).fill(p),
            new Array(4).fill(p),
            new Array(4).fill(p),
            new Array(4).fill(p),
            new Array(4).fill(p)
        ])
    })

    it('Obtem a frequencia em que os jobs aparecem em um conjunto de soluções (formigas)', function () {
        const instMatriz = new MatrizFeromonio(6,3)
        const hashmap = instMatriz.frequencia(getSolucoesTeste(instMatriz))

        expect(hashmap).not.toBeNull()
        // Frequencias dos jobs presentes nas soluções
        expect(hashmap.get('0-0')).toBe(3)
        expect(hashmap.get('1-0')).toBe(3)
        expect(hashmap.get('2-0')).toBe(2)
        expect(hashmap.get('5-0')).toBe(2)
        expect(hashmap.get('4-0')).toBe(1)
        expect(hashmap.get('3-1')).toBe(2)
        expect(hashmap.get('2-1')).toBe(2)
        expect(hashmap.get('5-1')).toBe(1)
        expect(hashmap.get('4-1')).toBe(1)
        expect(hashmap.get('4-2')).toBe(2)
        expect(hashmap.get('5-2')).toBe(1)
        expect(hashmap.get('3-2')).toBe(1)
        expect(hashmap.get('0-2')).toBe(1)
        expect(hashmap.get('1-2')).toBe(1)
        // A frequencia de um job que não está presente deve ser undefined
        expect(hashmap.get('1-1')).toBe(undefined)
    })

    it('Testa se está atualizando a matriz de feromônios', function () {
        const instMatriz = new MatrizFeromonio(6,3)
        
        instMatriz.atualizaFeromonio(getSolucoesTeste(instMatriz), instanciaTeste)
        expect(instMatriz).not.toBeNull()
        for (let i=0; i<instMatriz.T.length;i++){
            for (let j=0; j<instMatriz.T[i].length;j++){
                expect(typeof instMatriz.T[i][j]).toBe('number')
            }
        }
    })
})