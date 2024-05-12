import { UserRepository } from "../repositories/UserRepository";
import { AppDataSource } from "../database";
import { User } from "../intities/User";
export class UserService {
 private userRepository: UserRepository;
 constructor(
    userRepository = new UserRepository(AppDataSource.manager),
 ) {
    this.userRepository = userRepository;
 }

    createUser =  (name:string, email:string, password:string): Promise<User> => {
        const user = new User(name, email, password);
        return this.userRepository.createUser(user);
    }
    getUser = () => {
        
    }
    // deleteUser = (name:string, email:string) => {
    //     const index = this.db.findIndex(user => user.name === name && user.email === email);
    //     if (index !== -1) {
    //         this.db.splice(index, 1);
    //         console.log(`Usuário ${name} (${email}) removido.`);
    //     } else {
    //         console.log(`Usuário ${name} (${email}) não encontrado.`);
    //     }
        
    // }
}