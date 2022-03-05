import { Field, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class BaseEntity {
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
}
