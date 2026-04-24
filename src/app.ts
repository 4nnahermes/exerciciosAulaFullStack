import express, { Request, Response } from 'express';
import { produtoRotas } from './router/produto-router';
import { ProdutoController } from './controller/produto-controller';
import { ProdutoService } from './service/produto-service';
import { AppDataSource } from './data-source';
import { Produto } from './entity/produto';
import { Cliente } from './entity/cliente';
import { ClienteController } from './controller/cliente-controller';
import { ClienteService } from './service/cliente-service';
import { clienteRotas } from './router/cliente-router';

const app = express();
const port = 3000;
app.use(express.json());

// establish database connection
AppDataSource.initialize().then(async => {

    app.get('/hello', (req: Request, res: Response) => {
        res.json({ message: "Hello World!!" });
    })

    app.use('/uploads', express.static('my-uploads'))

    //Inicializacao das dependencias
    const produtoRepository = AppDataSource.getRepository(Produto);
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const produtoService = new ProdutoService(produtoRepository);
    const clienteService = new ClienteService(clienteRepository);
    const produtoController = new ProdutoController(produtoService);
    const clienteController = new ClienteController(clienteService);

    app.use('/api/produtos', produtoRotas(produtoController))
    app.use('/api/clientes', clienteRotas(clienteController))

    app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    });
});