import { Request, Response } from "express";
import { ClienteService } from "../service/cliente-service";

export class ClienteController {
    private service: ClienteService;

    constructor(service: ClienteService) {
        this.service = service;
    }

    inserir = async(req: Request, res: Response): Promise<void> => {
        const cliente = req.body;
        try {
            const novoCliente = await this.service.inserir(cliente);
            res.status(201).json(novoCliente);
        }
        catch(err: any) {
            res.status(err.id).json({ error: err.msg});
        }  
    }

    listar = async (_req: Request, res: Response): Promise<void> => {
        const listaClientes = await this.service.listar();
        res.json(listaClientes);
    }

    buscarPorId = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id as string);
        try{
            const cliente = await this.service.buscarPorId(id);
            res.json(cliente);
        } catch (err: any) {
            res.status(err.id).json({ error: err.msg});            
        }
    }

    atualizar = async (req: Request, res: Response): Promise<void> => {
        const id = +req.params.id;
        let cliente = req.body;
        try{
            res.json(await this.service.atualizar(id, cliente));
        } catch(err: any) {
            res.status(err.id).json(err);
        }
    }

    deletar = async (req: Request, res: Response): Promise<void> => {
        const id = +req.params.id;
        try {
            res.json(await this.service.deletar(id));
        }
        catch(err: any) {
            res.status(err.id).json(err);
        }
    }
}