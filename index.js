
const fs = require('fs');
const CarregaInstancias = require('./CarregaInstancias');
const ACO = require('./ACO');
const Formiga = require('./Formiga');
const BKS = require('./BKS.json');
const { carregaInstanciaTeste } = require('./Testes');
const { Parametros } = require('./Parametros');

const inst = new CarregaInstancias(Parametros.diretorioInstancias);

// let inst = {
//     instancias: [
//         carregaInstanciaTeste('Q20_10J_G1_1', './teste/1.dat')
//     ]
// }

console.log("--- Trabalho 2 Inteligencia Computacional ---")
console.log("\nIniciando a execução das instâncias")


let logCsv = "nome_artigo,media,minima,bks,erro,tempo\n"
let nomeCsv = `trabalho2_solucao_${new Date().getTime()}`

for(let i=0; i<inst.instancias.length;i++){
    const instancia = inst.instancias[i];

    // Limita a quantidade de instâncias pra rodar
    if(Parametros.limiteInstanciasRodar >= 0 && i >= Parametros.limiteInstanciasRodar){ 
        break;
    }
    
    console.log(`--- Inicia ACO para instância ${i+1} de ${inst.instancias.length} nomeada no artigo como ${instancia.nomeArtigo} ---`)

    let media = 0;
    let minima = 9999999999;
    let mediaTempo = 0

    // Faz 10 execuções do ACO para cada instância e tira a média e mínimo das soluções
    for (let j=0; j<Parametros.numExecucoes; j++){
        // Marca tempo de inicio do processamento
        const timestampInicio = new Date().getTime();

        // Inicia um ACO para essa instância
        const aco = new ACO(instancia)
        
        // Depois do processamento, obtem info da melhor solução
        const timestampFim = new Date().getTime();
        const { qualidade } = aco.getMelhorSolucaoInfo()
        const tempoProcessamento = (timestampFim - timestampInicio) / 1000
        
        mediaTempo += tempoProcessamento
        media += qualidade;
        if(qualidade < minima){
            minima = qualidade
        }
    }

    media /= Parametros.numExecucoes
    mediaTempo /= Parametros.numExecucoes

    const bks = BKS.find(x=>x.nomeArtigo === instancia.nomeArtigo).bks
    const erro = (minima - bks) / bks    
    
    console.log(`Instancia ${instancia.nomeArtigo}, media: ${media.toFixed(2)}, BKS: ${bks}, minima: ${minima}, erro: ${erro.toFixed(2)*100}%, tempo médio: ${mediaTempo.toFixed(2)}s \n`)

    // gera a linha no csv com os resultados
    logCsv += `${instancia.nomeArtigo},${media.toFixed(2)},${minima},${bks},${erro.toFixed(2)*100},${mediaTempo.toFixed(2)}\n`

    // Salva arquivo csv
    fs.writeFileSync(`${nomeCsv}.csv`, logCsv);
}

