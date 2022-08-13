const Formiga = require("./Formiga");
const Instancia = require("./Instancia");
const { Parametros } = require("./Parametros");
const { imprimeSolucao } = require("./Testes");

class MatrizFeromonio {

    T = [[]]
    numJobs=0
    numBatches=1

    constructor(numJobs, numBatches=1) {
        this.numJobs = numJobs
        this.numBatches = numBatches
        
        // Inicializa a matriz T dos feromônios
        this.T = new Array(numJobs);
        for (let i=0; i<numJobs; i++){
            this.T[i] = new Array(numBatches);
            for (let j=0; j<numBatches; j++){
                this.T[i][j] = Parametros.feromonioInicial
            }
        }
    }

    /**
     * Obtem o valor do feromônio para o caminho representado por um
     * job e um batch
     * @param {number} jobId Id do job
     * @param {number} batchId Indice do batch dentro do array da solução
     * @returns {number} Valor do feromônio
     */
    getFeromonio(jobId, batchId){

        if(this.numBatches < (batchId+1)){
            // insere uma coluna na matriz se o batch solicitado
            // não estiver na matriz
            for (let i=0; i<this.numJobs; i++){
                this.T[i].push(Parametros.feromonioInicial)
            }
            this.numBatches++
        }

        return this.T[jobId][batchId]
    }

    /**
     * Calcula a frequencia em que um job é inserido em um batch
     * na iteração atual
     * @param {Array<Formiga>} kMelhoresSolucoes 
     * @returns {} Tabela hash da frequencia
     */
    frequencia(kMelhoresSolucoes){
        const map = new Map();
        for (const formiga of kMelhoresSolucoes){
            for (let batch=0; batch < formiga.solucao.length; batch++){
                for (const job of formiga.solucao[batch].jobs){
                    // Define o formato da chave do hashmap
                    const chave = `${job.id}-${batch}`
                    if(map.has(chave)){
                        // Se já tá no hashmap, acresenta na frequencia
                        map.set(chave, map.get(chave) + 1)
                    } else {
                        // Se não está no hashmap, cria uma nova chave
                        map.set(chave, 1)
                    }
                }
            }
        }
        return map
    }

    /**
     * Calcula a evaporação e reforço do feromônio na matriz
     * @param {Array<Formiga>} kMelhoresSolucoes 
     * @param {Instancia} instancia
     */
    atualizaFeromonio(kMelhoresSolucoes, instancia){
        // φij(t + 1) = (1 − ρ) ∗ φxj(t) + Q/TWT(s) ∗ mxj(t)
        let map = this.frequencia(kMelhoresSolucoes)
        // console.log('---- Frequencia ----')
        // console.log(map)
        // console.log(map.size)
        // console.log('---- K melhores ----')
        // for(let k of kMelhoresSolucoes){
        //     console.log(imprimeSolucao(k), 'obj', k.getFuncaoObjetivo())
        // }
        for (let i=0; i<this.numJobs; i++){
            for (let j=0; j<this.numBatches; j++){
                
                let evaporacao = (1-Parametros.rho) * this.T[i][j]
                //let reforco = 0
                // if(freq > 1){
                //     // se job ==i estiver em kMelhoresSolucoes
                //     reforco = (instancia.numQ * freq) / (kMelhoresSolucoes[0].getFuncaoObjetivo())
                // }

                this.T[i][j] =  evaporacao //reforco +
            }
        }
       // [[0,1,3],[4]]
       // ({6,3,8,0},{1,2,4},{7,9},{5}) obj 870
        let melhorSolucao = kMelhoresSolucoes[0];
        for (let j=0; j<melhorSolucao.solucao.length; j++){
            for (let i=0; i<melhorSolucao.solucao[j].jobs.length; i++){
                const chave = `${i}-${j}`
                let freq = 0
                if(map.has(chave)){
                    freq = map.get(chave)
                }
                let jobId = melhorSolucao.solucao[j].jobs[i].id
                this.T[jobId][j] += (instancia.numQ * freq) / (melhorSolucao.getFuncaoObjetivo())
            }
        }
        /*
        [
        Batch { jobs: [ [Job], [Job], [Job], [Job] ] },
        Batch { jobs: [ [Job], [Job], [Job] ] },
        Batch { jobs: [ [Job], [Job] ] },
        Batch { jobs: [ [Job] ] }
        ]
        */
    }
    
}
// if(i in )
// Exporta o módulo pra ficar disponível pro resto do projeto
module.exports = MatrizFeromonio;

/*
---- Frequencia ----
Map(32) {
  '1-0' => 5,
  '0-0' => 6,
  '2-0' => 3,
  '8-0' => 5,
  '3-1' => 5,
  '6-1' => 4,
  '5-2' => 3,
  '4-2' => 6,
  '7-3' => 6,
  '9-3' => 5,
  '6-0' => 5,
  '2-1' => 5,
  '9-2' => 4,
  '5-3' => 2,
  '4-0' => 2,
  '8-1' => 2,
  '5-1' => 2,
  '2-2' => 2,
  '3-2' => 2,
  '9-0' => 1,
  '1-3' => 1,
  '5-0' => 3,
  '1-1' => 4,
  '0-1' => 3,
  '7-2' => 3,
  '8-2' => 1,
  '3-0' => 3,
  '4-1' => 2,
  '8-3' => 2,
  '7-1' => 1,
  '0-2' => 1,
  '6-2' => 1
}
32
---- K melhores ----
({1,0,2,8},{3,6},{5,4},{7,9}) obj 724
({0,1,6,8},{3,2},{4,9},{5,7}) obj 739
({4,0,1},{6,8,5},{2,3,9},{7}) obj 749
({0,8,6,9},{5,2},{4,3},{7,1}) obj 834
({5,6},{1,0,2,3},{4,7,8},{9}) obj 897
({2,8,3,1},{6,0,4},{9,7},{5}) obj 907
({0,3,8,5},{6,1,2},{7,4},{9}) obj 908
({6,4},{2,0,3,1},{9,5},{7,8}) obj 947
({3,1,2},{4,7,8},{5,0,6},{9}) obj 1049
({5,6,0},{1,3},{4,2},{9,7,8}) obj 1056

*/