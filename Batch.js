
class Batch {
    
    jobs = []

    constructor() {

    }
    /**
     * Insere um job dentro do batch
     * @param {Job} job
     */
    addJob(job){
        jobs = jobs.push(job)
    }

    timeInicio(){
        
    }

    timeFim(){

    }

    duracao(){

    }

    tamanhoBatch(){

    }

}

// Exporta o módulo pra ficar disponível pro resto do projeto
module.exports = Batch;