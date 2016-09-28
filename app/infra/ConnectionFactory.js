var mysql = require('mysql');

var createDbConnection = function(){
    if (process.env.NODE_ENV == 'development'){
        return mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database:'casadocodigo_nodejs'
        });
    }
    
    if (process.env.NODE_ENV == 'test'){
        return mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database:'casadocodigo_nodejs_test'
        });
    }

    if (process.env.NODE_ENV == 'production'){
        var urlConexao = process.env.CLEARDB_DATABASE_URL;
        var grupos = urlConexao.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?reconnect=true/);
        return mysql.createConnection({
            host: grupos[3],
            user: grupos[1],
            password: grupos[2],
            database: grupos[4]
        });
    }
}

module.exports = function(){
    return createDbConnection;
}