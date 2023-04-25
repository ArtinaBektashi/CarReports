import {AfterInsert, AfterRemove, AfterUpdate, Entity , Column , PrimaryGeneratedColumn} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email:string


    @Column()
    @Exclude()
    password:string;

    @AfterInsert()
    logInsert(){
        console.log('inserted user with id', this.id);
    }

    @AfterUpdate()
    logUpdate(){
         console.log('updated');
    }

    @AfterRemove()
    logRemove(){
        console.log('removed');
        
    }
}