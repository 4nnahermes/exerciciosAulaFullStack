import { DataSource } from "typeorm";
import { Produto } from "./entity/produto";
import { Categoria } from "./entity/categoria";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "senacrs",
    database: "crud-produtos",
    entities: [Produto, Categoria],
    logging: true,
    synchronize: true,
})