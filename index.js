
const fs = require('fs');
const CarregaInstancias = require('./CarregaInstancias');
const ACO = require('./ACO');
const Formiga = require('./Formiga');
const BKS = require('./BKS.json');
const { carregaInstanciaTeste } = require('./Testes');

//const inst = new CarregaInstancias();

let inst = {
    instancias: [
        carregaInstanciaTeste('Q20_10J_G1_1', './teste/1.dat')
    ]
}

console.log("--- Trabalho 2 Inteligencia Computacional ---")
console.log("\nIniciando a execução das instâncias")

const numExecucoes = 1;

let logCsv = "nome_artigo,media,minima,bks,erro,tempo\n";
for(let i=0; i<inst.instancias.length;i++){
    const instancia = inst.instancias[i];
    
    console.log(`--- Inicia ACO para instância ${i+1} de ${inst.instancias.length} nomeada no artigo como ${instancia.nomeArtigo} ---`)

    let media = 0;
    let minima = 9999999999;
    let mediaTempo = 0

    // Faz 10 execuções do ACO para cada instância e tira a média e mínimo das soluções
    for (let j=0; j<numExecucoes; j++){
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

    media /= numExecucoes
    mediaTempo /= numExecucoes

    const bks = BKS.find(x=>x.nomeArtigo === instancia.nomeArtigo).bks
    const erro = (minima - bks) / bks    
    
    console.log(`Instancia ${instancia.nomeArtigo}, media: ${media}, BKS: ${bks}, minima: ${minima}, erro: ${Math.round(erro*100)}%, tempo médio: ${Math.round(mediaTempo*100)/100}s \n`)

    // gera a linha no csv com os resultados
    logCsv += `${instancia.nomeArtigo},${Math.round(media*100)/100},${minima},${bks},${erro},${Math.round(mediaTempo*100)/100}\n`

    if(i >= 1){ 
        break;
    }
}

// Salva arquivo csv
//fs.writeFileSync(`trabalho2_solucao_${new Date().getTime()}.csv`, logCsv);