import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ExistingUserDTO } from 'src/user/dto/existinguser.dto';
import { NewUserDTO } from 'src/user/dto/newuser.dto';
import { UserDetail } from 'src/user/user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    register(@Body() user: NewUserDTO): Promise<UserDetail | null>{
        return this.authService.register(user)
    }
 
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user: ExistingUserDTO): Promise<{token: string} | null>{
        return this.authService.login(user)
    }

       

}
