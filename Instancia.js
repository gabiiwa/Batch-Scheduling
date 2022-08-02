
/**
 * Classe que representa uma instância do problema
 */
class Instancia {

    nomeArtigo = ""
    numJobs = 0
    numQ = 0
    jobs = []

    constructor(nome) {
        this.nomeArtigo = nome
    }

    /**
     * Adiciona número de jobs que essa instância vai conter
     * @param {number} jobs 
     */
    setNumJobs(jobs) {
        this.numJobs = jobs
    }

    /**
     * Define a capacidade da máquina para essa instância
     * @param {number} q 
     */
    setNumQ(q) {
        this.numQ = q
    }

    /**
     * Adiciona um job à instância
     * @param {Job} job 
     */
    addJob(job) {
        this.jobs.push(job)
    }
}

// Exporta o módulo pra ficar disponível pro resto do projeto
module.exports = Instancia;