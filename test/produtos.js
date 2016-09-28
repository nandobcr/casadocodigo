var express = require('../config/express')();
var request = require('supertest')(express);
var DatabaseCleaner = require('database-cleaner');

describe('#ProdutosController', function(){
    var limpaTabelas = function(done){
            var databaseCleaner = new DatabaseCleaner('mysql');
            databaseCleaner.clean(express.infra.ConnectionFactory(), function (){
                done();
        });
    }
    
    beforeEach(function(done){
        limpaTabelas(done);
    });

    afterEach(function(done){
        limpaTabelas(done);
    });

    it('#listagem json', function(done){
        request.get('/produtos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('#listagem html', function(done){

        request.get('/produtos')
        .set('Accept', 'text/html')
        .expect('Content-Type', /html/)
        .expect(200, done);
    });

    it ('#cadastro de novo produto com titulo invalido', function(done){
        request.post('/produtos')
        .send({titulo : "", preco : 120, descricao : "novo livro"})
        .expect(400, done);
    });

    it ('#cadastro de novo produto com preco invalido', function(done){
        request.post('/produtos')
        .send({titulo : "teste 1", preco : "12,34", descricao : "novo livro"})
        .expect(400, done);
    });

    it ('#cadastro de novo produto valido', function(done){
        request.post('/produtos')
        .send({titulo : "teste 1", preco : 230, descricao : "novo livro"})
        .expect(302, done);
    });
});
