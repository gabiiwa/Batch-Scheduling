
const fs = require('fs');
const CarregaInstancias = require('./CarregaInstancias');
const ACO = require('./ACO');
const Formiga = require('./Formiga');

const inst = new CarregaInstancias();

console.log("--- Trabalho 2 Inteligencia Computacional ---")
console.log("\nIniciando a execução das instâncias")

let logCsv = "nome_artigo,funcao_objetivo,solucao,tempo\n";
for(let i=0; i<inst.instancias.length;i++){
    const instancia = inst.instancias[i];

    // Marca tempo de inicio do processamento
    const timestampInicio = new Date().getTime();
    
    console.log(`--- Inicia ACO para instância ${i+1} of ${inst.instancias.length} nomeada no artigo como ${instancia.nomeArtigo} ---`)

    // Inicia um ACO para essa instância
    const aco = new ACO(instancia)
    const timestampFim = new Date().getTime();
    
    // Depois do processamento, obtem info da melhor solução
    const {solucao, qualidade} = aco.getMelhorSolucaoInfo()
    const tempoProcessamento = (timestampFim - timestampInicio) / 1000
    
    console.log(`Solução para ${instancia.nomeArtigo} com função objetivo retornando ${qualidade} em ${tempoProcessamento} segundos\n`)

    // gera a linha no csv com os resultados
    logCsv += `${instancia.nomeArtigo},${qualidade},${Formiga.imprimeSolucao(solucao)},${tempoProcessamento}\n`
}

// Salva arquivo csv
fs.writeFileSync(`trabalho2_solucao_${new Date().getTime()}.csv`, logCsv);