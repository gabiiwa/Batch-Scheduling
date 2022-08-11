const fs = require('fs');
const Instancia = require('./Instancia');
const Job = require('./Job');

/**
 * Classe que faz a leitura das instâncias do problema
 */
class CarregaInstancias {

    instancias = []

    /**
     * Construtor da classe, que faz a leitura dos diretorios das instâncias
     */
    constructor() {
        const capacidade = fs.readdirSync('./data')
        for (var i = 0; i < capacidade.length; i++) {
            // Lê as pastas relacionadas a capacidade da máquina
            const jobs = fs.readdirSync(`./data/${capacidade[i]}`)
            for (var j = 0; j < jobs.length; j++) {
                // Lê as pastas relacionadas a quantidade de jobs
                const grupo = fs.readdirSync(`./data/${capacidade[i]}/${jobs[j]}`)
                for (var k = 0; k < grupo.length; k++) {
                    // Lê as pastas relacionadas aos grupos de instâncias
                    const arquivo = fs.readdirSync(`./data/${capacidade[i]}/${jobs[j]}/${grupo[k]}`)
                    const caminho = `./data/${capacidade[i]}/${jobs[j]}/${grupo[k]}/${arquivo[0]}`
                    const nome_artigo = `Q${capacidade[i]}_${jobs[j]}J_G${k + 1}_${arquivo[0].split('.')[0]}`
                    this._carregaInstancia(nome_artigo, caminho);
                }
            }
        }
    }

    /**
     * Função interna que vai carregar a instância
     * @param {string} nome_artigo Nome da instância no artigo de referência
     * @param {string} caminho_arquivo Caminho do arquivo no computador
     */
    _carregaInstancia(nome_artigo, caminho_arquivo) {
        
        //faz a leitura do arquivo da instancia
        let dataBuffer = fs.readFileSync(caminho_arquivo);
        const linhas = dataBuffer.toString().split('\n');
        const instancia = new Instancia(nome_artigo)
        let i = 0;
        
        //anda pelas linhas do arquivo da instância
        for (const line of linhas) {
            const ls = line.trim() // Elimina espaços vazios e quebras de linha
            let lsArr = ls.split(' ') // Quebra linha em um array usando os espaços como separador
            lsArr = lsArr.filter(x => x !== '') // Elimina os itens do array com strings vazias
            lsArr = lsArr.map(x => parseInt(x)) // Converte strings em inteiros
            if (i === 0) {
                instancia.setNumJobs(lsArr[0])
            } else if (i === 1) {
                instancia.setNumQ(lsArr[0])
            } else if (lsArr.length === 5) {
                instancia.addJob(new Job(
                    i-2,      // id
                    lsArr[0], // p
                    lsArr[1], // d
                    lsArr[2], // s
                    lsArr[3], // w
                    lsArr[4], // r
                ))
            }
            i++;
        }

        // Adiciona a instância a lista de instâncias
        this.instancias.push(instancia);
    }
}

// Exporta o módulo pra ficar disponível pro resto do projeto
module.exports = CarregaInstancias;