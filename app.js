const http = require('http');
const { MongoClient } = require('mongodb');

const hostname = '0.0.0.0';
const port = 3000;
const url = process.env.MONGO_URL || 'mongodb://mongo:27017';
const dbName = 'meu_banco';

async function iniciarServidor() {
  const client = new MongoClient(url);
  
  try {
    await client.connect();
    console.log('Conectado ao MongoDB com sucesso!');
    const db = client.db(dbName);
    const usuariosCollection = db.collection('usuarios');

    const server = http.createServer(async (req, res) => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');

      if (req.method === 'GET' && req.url === '/usuarios') {
        const usuarios = await usuariosCollection.find({}).toArray();
        res.statusCode = 200;
        return res.end(JSON.stringify(usuarios));
      }

      if (req.method === 'POST' && req.url === '/usuarios') {
        let corpo = '';
        
        req.on('data', chunk => { corpo += chunk.toString(); });
        
        req.on('end', async () => {
          try {
            const novoUsuario = JSON.parse(corpo);
            if (!novoUsuario.nome) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ erro: 'O campo nome é obrigatório' }));
            }
            
            const resultado = await usuariosCollection.insertOne(novoUsuario);
            res.statusCode = 201;
            return res.end(JSON.stringify({ 
              mensagem: 'Usuário criado!', 
              id: resultado.insertedId 
            }));
          } catch (e) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ erro: 'JSON inválido' }));
          }
        });
        return;
      }

      if (req.url === '/') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.statusCode = 200;
        return res.end('Servidor Node.js ativo!Kauan Morais e Daniel Cláudio.\n');
      }

      res.statusCode = 404;
      return res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
    });

    server.listen(port, hostname, () => {
      console.log(`Servidor rodando em http://${hostname}:${port}/`);
    });

  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error);
    process.exit(1);
  }
}

iniciarServidor();