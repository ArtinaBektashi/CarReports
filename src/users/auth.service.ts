import { Injectable } from "@nestjs/common/decorators";
import { UsersService } from "./users.service";
import { BadRequestException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);


@Injectable()
export class AuthService{
    constructor(private usersService : UsersService){}

    async signup(email: string, password: string){
        //See if email is in use
        const users= await this.usersService.find(email);
        if(users.length){
            throw new BadRequestException('email in use');
        }
        //Hash users password
        // Generate a salt
        const salt = randomBytes(8).toString('hex');

        //Hash the salt and password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        //Join the hashed result and the salt together
        const result = salt + '.'+hash.toString('hex');

        //create a new user and save it
        const user = await this.usersService.create(email,result);
      
        //return user
        return user;
    }

    signin(){

    }
}