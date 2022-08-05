
class Job {

    id=0
    tempoProcessamento = 0
    tamanho = 0
    dataLancamento = 0
    prazo = 0
    peso = 0

    constructor(id, p, d, s, w, r) {
        this.id=id
        this.tempoProcessamento = p
        this.prazo = d
        this.tamanho = s
        this.peso = w
        this.dataLancamento = r
    }
    
}

// Exporta o módulo pra ficar disponível pro resto do projeto
module.exports = Job;