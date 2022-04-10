const request = require("supertest")
const server = require('../../server')
var bilheteid = ''
const res = request(server)

describe('Insere bilhetes', () => {    

    it('Inserido com Sucesso', async () => {
        await res.post('/bilhete')
        .send({
            "quantidade":6,
            "dezenas":6
        })
        .expect(201)        
    })

    it('Falha na Inserção', async () => {
        await res.post('/bilhete')
        .send({
            "quantidade":6
        })
        .expect(400)
    })   
})

describe('Busca de bilhetes', () => {
    it('Sucesso', async () => {     
        
        var bilhetes = await res.get('/bilhete')  
        expect(200)
        bilheteid = bilhetes.body[0] 
        expect(bilhetes.body)
        
    })

    it('Nenhum bilhete retornado', async () => {
        var restart = await res.post('/restart') 
        var bilhetes = await res.get('/bilhete')       
        expect((bilhetes.body).length).toEqual(0)
    })
})

describe('Busca bilhete por ID', () => {
    it('Bilhete encontrado com Sucesso', async () => {      
        var bilhete = await res.get('/bilhete/'+bilheteid)  
        .expect(200)              
        expect(bilhete.body)
        
    })

    it('Bilhete não retornado', async () => {
        var restart = await res.post('/restart') 
        var bilhete = await res.get('/bilhete/'+bilheteid)       
        expect((bilhete.body).length).toEqual(0)
    })
})

describe('Realiza Premiação', () => {
    it('Nenhum bilhete foi gerado', async () => {      
        var premiacao = await res.post('/premiacao')  
        .expect(404)              
        expect(premiacao.body).toEqual("Nenhum bilhete foi gerado. Tente novamente mais tarde")
        
    })    

    it('Premiação realizada com sucesso', async () => {
        
        await res.post('/bilhete')
        .send({
            "quantidade":6,
            "dezenas":6
        })
        .expect(201)    

        var premiacao = await res.post('/premiacao')  
        .expect(200)              
        expect(premiacao.body)
    })

    it('Premiação já realizada', async () => {
        var premiacao = await res.post('/premiacao')  
        .expect(403)              
        expect(premiacao.body).toEqual("Premiação já realizada, para realizar uma nova refaça o processo")
    })
})