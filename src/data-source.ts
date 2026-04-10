import { DataSource } from "typeorm";
import { Produto } from "./entity/produto";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "senacrs",
    database: "crud-produtos",
    entities: [Produto],
    logging: true,
    synchronize: true,
})