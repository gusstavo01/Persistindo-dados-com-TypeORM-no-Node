import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { UserService } from "../services/UserService";
import { Request } from "express";
import { UserController } from "./UserController";

const mockUserService = {
    createUser: jest.fn()
}

jest.mock('../services/UserService', () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
        return mockUserService
    })
  }
})
describe('UserController', () => {  
 
    const userControler = new UserController();
    const mockResponse = makeMockResponse()
   

 
    it('Deve adicionar um novo usuário',() => {
        const mockRequest = {
           body: {
            name: 'Gustavo',
            email:'teste@gmail.com',
            password:'password'
           }
        }as Request
       
        userControler.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message:'Usuário criado'})
});
    it('Deve retornar erro quando o nome não é fornecido', () => {
        const mockRequest = {
            body: {
                name:'',
                email: 'teste@gmail.com',
                password: 'password'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userControler.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message:'Bad Request: Todos os campos são obrigatórios'});
    
    })
    it('Deve retornar um erro quando o email não é fornecido',() => {
        const mockRequest = {
            body: {
                name: 'Gustavo',
                email: '',
                password: 'password'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userControler.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message:'Bad Request: Todos os campos são obrigatórios'});
    })
    it('Deve retornar um erro caso o usuário não informe o password',() => {
        const mockRequest = {
            body: {
                name: 'Gustavo',
                emaol: 'teste@gmail.com',
                password: ''
            }
        } as Request;
       
        userControler.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message:'Bad Request: Todos os campos são obrigatórios'});
       
    })
    // it('Deve deletar um usuário', () => {
    //     const mockRequest = {
    //         body: {
    //          name: 'Gustavo',
    //          email:'teste@gmail.com'
    //         }
    //      }as Request
    //     const mockResponse = makeMockResponse();
    //     userControler.deleteUser(mockRequest, mockResponse);
    //     expect(mockUserService.deleteUser).toHaveBeenCalledWith('Gustavo', 'teste@gmail.com');

    //     // Verificar se a resposta correta foi enviada
    //     expect(mockResponse.state.status).toBe(200);
    //     expect(mockResponse.state.json).toMatchObject({message: 'Usuário deletado com sucesso!'});
    // });
    })
