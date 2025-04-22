import mysql, { Connection, ConnectionOptions , QueryError } from 'mysql2/promise';
import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import cors from '@fastify/cors';

const app = fastify()
app.register(cors)

app.get("/", (request: FastifyRequest, reply: FastifyReply) => {
    reply.send("Fastify Funcionando!")
})
app.get("/estudantes", async (request: FastifyRequest, reply: FastifyReply) => {
    const access: ConnectionOptions = {
        host: "localhost",
        user: 'root',
        password: "",
        database: 'banco1023b',
        port: 3306
    };
    try {
        const conn = await mysql.createConnection(access);
    } catch (erro:any) {
        if (erro.code === "ECONNREFUSED") {
            console.log({mensagem:"ERRO: LIGUE O LARAGÃO!!! CABEÇA!"})
        } else if (erro.code === "ER_BAD_DB_ERROR") {
            console.log({mensagem:"ERRO: CONFIRA O NOME DO BANCO DE DADOS OU CRIE UM NOVO BANCO COM O NOME QUE VOCÊ COLOCOU LÁ NA CONEXÃO"})
        } else if (erro.code === "ER_ACCESS_DENIED_ERROR") {
            console.log("ERRO: CONFIRA O USUÁRIO E SENHA NA CONEXÃO")
        } else {
            console.log(erro)
        }
    }
    // conn
    // .then((conn:Connection)=>{
    //     console.log("Conectou no banco")

    //     conn.query("SELECT * FROM estudantes")
    //     .then(query=>{
    //         // const resultado = query[0]
    //         // const estruturaTabela = query[1]
    //         const [resultado,estruturaTabela] = query
    //         console.log(resultado)
    //         reply.send(resultado)
    //     })
    //     .catch((erro)=>{
    //         if(erro.code==="ER_NO_SUCH_TABLE"){
    //             console.log("ERRO: Não existe a tabela que você está tentando usar. Crie a tabela no banco de dados.")
    //         }else if(erro.code==="ER_PARSE_ERROR"){
    //             console.log("ERRO: VOCÊ DIGITOU SUA QUERY DE FORMA ERRADA. CONFIRA OS PARENTESES, VIRGULAS E NOME DAS COLUNAS")
    //         }
    //         else{
    //             console.log(erro)
    //         }
    //     })

    //     conn.end()
    //     .then(()=>console.log("Finalizei a conexão"))
    //     .catch(()=>console.log("Não Finalizei a conexão"))
    //     //.finally(()=>console.log("Não importa se executou o THEN OU CATCH vou executar o FINALLY"))
    // })
    // .catch(erro=>{
    //     console.log("Não conectou :(")
    //     if(erro.code==="ECONNREFUSED"){
    //         console.log("ERRO: LIGUE O LARAGÃO!!! CABEÇA!")
    //     }else if(erro.code==="ER_BAD_DB_ERROR"){
    //         console.log("ERRO: CONFIRA O NOME DO BANCO DE DADOS OU CRIE UM NOVO BANCO COM O NOME QUE VOCÊ COLOCOU LÁ NA CONEXÃO")
    //     }else if(erro.code==="ER_ACCESS_DENIED_ERROR"){
    //         console.log("ERRO: CONFIRA O USUÁRIO E SENHA NA CONEXÃO")
    //     }else{
    //         console.log(erro)
    //     }
    // })

})
app.listen({ port: 8000 }, (erro, endereco) => {
    if (erro) {
        console.log("ERRO: Fastify não iniciou")
    }
    console.log(`Fastify iniciado na porta: ${endereco}`)
})


































