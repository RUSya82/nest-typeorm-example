import {ArgumentMetadata,  Injectable,  PipeTransform} from "@nestjs/common";
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';


@Injectable()
export class UserEntityPipe implements PipeTransform{
    constructor(
        private userService: UsersService
    ) {
    }
    async transform(value: number, metadata: ArgumentMetadata): Promise<User | null> {
        if(value)
            return  this.userService.findOne(value);
        return null;
    }
}