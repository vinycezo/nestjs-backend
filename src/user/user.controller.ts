import { Controller, Get,Param } from '@nestjs/common';

import { UserDetail } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get(':id')
    getuser(@Param('id') id:string): Promise<UserDetail | null>{
        return this.userService.findbyid(id);
    }
}
