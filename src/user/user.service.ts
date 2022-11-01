import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDetail } from './user.interface';
import { UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel:Model<UserDocument>){}

    _getuserdetails(user: UserDocument): UserDetail{
        return  {id: user._id,  name:user.name, email:user.email  }

    }

    async findbyemail(email:string): Promise<UserDocument | null>{
        return this.userModel.findOne({email}).exec();
    }

    async findbyid(id:string): Promise<UserDetail | null>{
        const user = await this.userModel.findById(id).exec();
        if (!user) return null;
        return this._getuserdetails(user);
        
    }


    async create(name:string, email:string, hashedPassword:string): Promise<UserDocument>{
        const newUser= new this.userModel({name,email,password:hashedPassword})
        return newUser.save()
    }
}

