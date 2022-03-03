import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { PublicId } from '../types/publicId';
import { DateFields } from './Common';

@ObjectType()
@Entity()
export class User extends DateFields {
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  @Generated('uuid')
  userId!: PublicId;

  @Field()
  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  salt!: string;
}
