import { Field, ObjectType } from '@nestjs/graphql';
import { AuthProvider } from '@package/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from './base/BaseEntity';
import { FormTemplate } from './FormTemplate.entity';
import { InsertOmitFields } from './types';

export type InsertUser = Omit<User, InsertOmitFields | 'formTemplates'>;
@ObjectType()
@Entity()
export class User extends BaseEntity {
  constructor(input: InsertUser) {
    super();
    Object.assign(this, input);
  }

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'userId' };

  @Field()
  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  salt!: string;

  @Column()
  provider!: AuthProvider;

  @Field(() => Date)
  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt!: Date;

  @OneToMany(() => FormTemplate, (formTemplate) => formTemplate.user)
  formTemplates!: FormTemplate[];
}
