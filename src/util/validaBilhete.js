module.exports = {

    validaInformacoesBilhete(body) {

        return new Promise((resolve, reject) => {

            var retorno = [];

            if (body.dezenas === undefined) {
                retorno['mensagem'] = "É necessário informar as dezenas";
                retorno['status'] = 'reject';
            }

            if (body.quantidade === undefined) {
                retorno['mensagem'] = "É necessário informar a quantidade de bilhetes";
                retorno['status'] = 'reject';
            }

            if (body.quantidade > 50) {
                retorno['mensagem'] = "Limite de bilhetes excedido (Máximo 50)";
                retorno['status'] = 'reject';
            }

            if (body.dezenas < 6 || body.dezenas > 10) {
                retorno['mensagem'] = "Dezenas inválidas informe um número entre 6 e 10";
                retorno['status'] = 'reject';
            }

            if (retorno['status'] == 'reject') {
                reject({ 'status': false, 'mensagem': retorno['mensagem'] });
            } else {
                resolve({ 'status': true });
            }

        });
    },
}