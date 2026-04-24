import { Repository } from "typeorm";
import { Cliente } from "../entity/cliente";

export class ClienteService {
    private repository: Repository<Cliente>;

    constructor(repository: Repository<Cliente>){
        this.repository = repository;
    }

    async inserir(cliente: Cliente): Promise<Cliente> {
        if(!cliente || !cliente.nome || !cliente.email || !cliente.telefone) {
            throw({id:400, msg: "Falta dados obrigatorios de cliente"});            
        }
        return await this.repository.save(cliente);
    }

    async listar(): Promise<Cliente[]> {
        return await this.repository.find();
    }

    async buscarPorId(id: number): Promise<Cliente> {
        let cliente = await this.repository.findOne({
            where: {id:id}
        });
        if(!cliente) {
            throw({id: 404, msg:"Cliente nao encontrado!"})
        }
        return cliente;
    }

    async atualizar(id:number, clienteAlterado: Cliente): Promise<Cliente> {
        if(clienteAlterado && clienteAlterado.nome && clienteAlterado.email && clienteAlterado.telefone) {
            const cliente = await this.repository.findOneBy({id:id});
            if(cliente) {
                cliente.nome = clienteAlterado.nome;
                cliente.email = clienteAlterado.email;
                cliente.telefone = clienteAlterado.telefone;
                await this.repository.save(cliente);
                return cliente;
            }        
            else {
                throw {id:404, msg: "Cliente não encontrado"};
            }
        }
        else {
            throw {id:400, msg: "Cliente sem dados corretos"};
        }
    }

    async deletar(id:number) {
        let cliente = await this.repository.findOneBy({id:id});
        if(cliente) {
            await this.repository.delete({id:id});
            return cliente;
        }
        else {
            throw { id: 404, msg: "Cliente não encontrado!" }
        }
    }
}