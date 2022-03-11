import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ormConfig } from './config/orm.config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './services/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormTemplateModule } from './services/formTemplate/formTemplate.module';
import { AuthModule } from './services/auth/auth.module';
import { FormResponseModule } from './services/formResponse/formResponse.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...ormConfig, autoLoadEntities: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: 'http://localhost:3000',
        credential: true,
      },
    }),
    AuthModule,
    UserModule,
    FormTemplateModule,
    FormResponseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
