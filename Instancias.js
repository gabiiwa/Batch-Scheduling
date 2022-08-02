const fs = require('fs')

class Instancias {
    // leituraArquivo(diretorio){
    //     if(diretorio.endsWith('dat')){
    //         return diretorio;
    //     }
    //     else{
    //         const diretorios = fs.readdirSync(diretorio);
    //         for(var i=0; i<diretorios.length;i++){
    //             return this.leituraArquivo(diretorios[i]);
    //         }
    //     }
    // }

    constructor() {
        //var caminho_lista = []
        var caminho_dict = {}
        const capacidade = fs.readdirSync('./data')
        //console.log('capacidade', capacidade)
        for(var i=0; i<capacidade.length;i++){
            // caminho_lista.push(capacidade[i])
            const jobs = fs.readdirSync(`./data/${capacidade[i]}`)
            //console.log('jobs',jobs)
            for(var j=0; j<jobs.length;j++){
                const grupo = fs.readdirSync(`./data/${capacidade[i]}/${jobs[j]}`)                
                //console.log('caminho',`./data/${capacidade[i]}/${jobs[j]}`)
                for(var k=0;k<grupo.length;k++){
                    const arquivo = fs.readdirSync(`./data/${capacidade[i]}/${jobs[j]}/${grupo[k]}`)  
                    const caminho = `./data/${capacidade[i]}/${jobs[j]}/${grupo[k]}/${arquivo[0]}`    
                    const nome_instancia = `Q${capacidade[i]}_${jobs[j]}_G${k+1}_${arquivo[0].split('.')[0]}`          
                    //console.log('caminho',`./data/${capacidade[i]}/${jobs[j]}/${grupo[k]}/${arquivo[0]}`)
                    //caminho_lista.push(`./data/${capacidade[i]}/${jobs[j]}/${grupo[k]}/${arquivo[0]}`)
                    //console.log(`Q${capacidade[i]}_${jobs[j]}_G${k+1}_${arquivo[0].split('.')[0]}`)
                    caminho_dict[nome_instancia] = caminho;
                }
            }
        }
        console.log('caminho_dict',caminho_dict)

        // var dict = {
        //     'Q20_20J_G1_5': './data/20/20/20J_s10_r10/5.dat'
        // }
        // var a = './data/20/20/20J_s10_r10/5.dat';
        // console.log(a.split('/').pop().split('.')[0]);

        for (const [key, value] of Object.entries(caminho_dict)) {
            console.log('key:',key,'value:',value)
        }
    }
}
    

module.exports = Instancias;

/*
Instancias
     lista de Instancia(nome_artigo, caminho_arquivo)
                  lista de Job(variaveis do job)

 */