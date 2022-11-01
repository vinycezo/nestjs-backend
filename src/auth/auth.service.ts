import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ExistingUserDTO } from 'src/user/dto/existinguser.dto';
import { NewUserDTO } from 'src/user/dto/newuser.dto';
import { UserDetail } from 'src/user/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userservice:UserService, private jwtservice:JwtService){}

    async hashPassword(password:string): Promise<string>{
        return bcrypt.hash(password, 10);
    }

    async register(user: Readonly <NewUserDTO>): Promise<UserDetail | any>{
        const {name, email, password}= user;
         const existingUser= await this.userservice.findbyemail(email);
         if (existingUser) return 'email taken';

        const hashedPassword= await this.hashPassword(password);

         const newUser = await this.userservice.create(name,email,hashedPassword);
         return this.userservice._getuserdetails(newUser);
    }

    async doesPasswordMatch(password:string, hashedPassword:string): Promise<boolean>{
        return bcrypt.compare(password,hashedPassword);
    }

    async validateUser(email:string, password:string):Promise<UserDetail | null>{
        const user = await this.userservice.findbyemail(email);
        const doesuserexist= !!user;

        if(!doesuserexist) return null;

        const doesPasswordMatch= await this.doesPasswordMatch(password, user.password)
        if (!doesPasswordMatch) return null;

        return this.userservice._getuserdetails(user)
    }

    async login(existingUser:ExistingUserDTO): Promise<{token: string} | null>{
        const {email, password} = existingUser;
        const user= await this.validateUser(email, password);
        if(!user) return null;

        const jwt= await this.jwtservice.signAsync({user})
        return {token: jwt};
    }
}
