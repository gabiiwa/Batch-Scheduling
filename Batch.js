const Job = require("./Job")

class Batch {
    
    jobs = []

    constructor(listaDeJobs) {
        this.jobs = listaDeJobs
    }
    /**
     * Insere um job dentro do batch
     * @param {Job} job
     */
    addJob(job){
        this.jobs.push(job)
    }

    /**
     * Retorna um vetor de data mínima para o início do processamento
     * @returns {Job.dataLancamento}
     */
    getDataLancamentoBatch(){
        // r(Bi) = max j ∈ Bi {Job.dataLancamento j };
        let r=0
        for(let j=0; j<this.jobs.length; j++){
            if(this.jobs[j].dataLancamento > r){
                r=this.jobs[j].dataLancamento
            }
        }
        return r
    }

    
    /**
     * Retorna o tempo de processamento de um batch
     * @returns {Job.tempoProcessamento}
     */
     getTempoProcessamentoBatch(){
        // p(Bi) = max j ∈ Bi {Job.tempoProcessamento j }
        let p=0
        for(let j=0; j<this.jobs.length; j++){
            if(this.jobs[j].tempoProcessamento > p){
                p = this.jobs[j].tempoProcessamento
            }
        }
        return p
    }

    /**
     * Retornar o tamanho do batch
     */
    tamanhoBatch(){
        return this.jobs.length
    }

}

// Exporta o módulo pra ficar disponível pro resto do projeto
module.exports = Batch;