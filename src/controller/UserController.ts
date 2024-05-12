import { Request,Response } from "express";
import { UserService } from "../services/UserService";


export class UserController {
    userService: UserService;
    constructor(
        userService = new UserService()
    ){
        this.userService = userService;
    }
    createUser =  (request: Request, response: Response) => {
      
            const user = request.body;
            if(!user.name || !user.email || !user.password) {// ! nulo | !!nulo && indefinido
                return response.status(400).json({ message:'Bad Request: Todos os campos são obrigatórios' });
            }
          
            this.userService.createUser(user.name,user.email, user.password);
            return response.status(201).json({message:'Usuário criado'});
        
    }
    getUser =  (request: Request, response: Response) => {
           
            // const users = this.userService.getAllUsers();
             return response.status(200)//.json(users);
    }

    // deleteUser = (request: Request, response: Response) => {
    //     const {name, email} = request.body;
    //     if(!name || !email) {
    //         return response.status(400).json({ message:'Bad Request: Name ou Email obrigatório' });
    //     }
    //     try {
    //         this.userService.deleteUser(name,email);
    //         return response.status(200).json({message:'Usuário deletado com sucesso!'});
    //     } catch(error) {
    //         return response.status(500).json({ message: 'Erro ao remover usuário'});
    //     }
    //  }
}