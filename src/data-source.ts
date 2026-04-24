import { DataSource } from "typeorm";
import { Produto } from "./entity/produto";
import { Categoria } from "./entity/categoria";
import { Cliente } from "./entity/cliente";
import { Pedido } from "./entity/pedido";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "senacrs",
    database: "crud-produtos",
    entities: [Produto, Categoria, Cliente, Pedido],
    logging: true,
    synchronize: true,
})