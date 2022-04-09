let bilhete = require("../bilhete");
let premiacao = require("../premiacao");
const { validaInformacoesBilhete } = require("../util/validaBilhete");

module.exports = {   

    create(request, response) {

        const { body } = request;
        const quantidade = body.quantidade;
        const dezenas = body.dezenas;        
        let criados = [];

        validaInformacoesBilhete(body).then((result) => {

            for (let i = 0; i < quantidade; i++) {  
                var list = [];             
                for (let i = 0; i < dezenas; i++) {
                    let min = Math.ceil(10);
                    let max = Math.floor(99);
                    var dezena =  Math.floor(Math.random() * (max - min + 1)) + min;

                    while (list.indexOf(dezena) >= 0) {
                        dezena = Math.floor(Math.random() * (max - min + 1)) + min;
                    }

                    list.push(dezena); 
                }

                list = list.sort(function (a, b) {  return a - b;  });

                const Bilhete = {
                    id: Math.floor(Math.random() * 1000),
                    resultado: list,
                    data: new Date().toLocaleString()
                };
                
                bilhete.push(Bilhete);
                criados.push(Bilhete);
            }

            response.send(201, criados);
        }).catch((error) => {
            response.send(400, error.mensagem);
        })
    },

    read(request,response) {
        response.send(200, bilhete);  
    },

    readById(request,response) {
        let bilet = bilhete.filter(function(item){
            return item.id == request.params.id;
        })
        response.send(200, bilet);  
    },

    premiacao(request,response){
        let premio = 0;            

        if(premiacao.length > 0){
            response.send(403,"Premiação já realizada, para realizar uma nova refaça o processo");
        }else{
            if(bilhete.length > 0){
                premio = Math.floor(Math.random() * (bilhete.length - 0 + 1)) + 0;
                premiacao.push(bilhete[premio]);
                response.send(200,premiacao);  
            }else{
                response.send(404,"Nenhum bilhete foi gerado. Tente novamente mais tarde");
            }   
        }
    },

    restart(request,response){
        premiacao = [];
        bilhete = [];
        response.send(200,"Premiação reiniciada com sucesso!");
    }

}