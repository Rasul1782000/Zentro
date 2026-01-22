import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(userData: Partial<User>): Promise<User>;
    findOneByEmail(email: string): Promise<User | null>;
    findOne(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(id: string, updateUserDto: any): Promise<User | null>;
    remove(id: string): Promise<void>;
}
