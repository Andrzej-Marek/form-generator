import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './services/user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: 'http://localhost:3000',
        credential: true,
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
