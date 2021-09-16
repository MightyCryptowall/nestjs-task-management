import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';


@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    
    async createUser(authCredentialsDto:AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
    }
}