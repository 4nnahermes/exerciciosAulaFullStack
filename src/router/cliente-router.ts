import { Request, Response, Router } from "express";
import multer from 'multer';
import { ClienteController } from "../controller/cliente-controller";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + "."+file.originalname.substring(file.originalname.length-3, file.originalname.length))
  }
})

//const upload = multer({dest:'./uploads/'});
const upload = multer({storage:storage});

// /api/clientes
export const clienteRotas = (controller: ClienteController): Router => {
    const router = Router();

    router.post('/', controller.inserir);
    router.get('/', controller.listar );
    router.get('/:id', controller.buscarPorId);
    router.put('/:id', controller.atualizar );
    router.delete('/:id', controller.deletar );

    router.post('/imagens/upload', upload.single('imagem') , async (req: Request, res: Response): Promise<any>  => {
        console.log(req.file);
        res.send("Imagem carregada com sucesso!");
    });

    return router;
}