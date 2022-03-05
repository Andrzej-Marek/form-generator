import 'reflect-metadata';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as connectRedis from 'connect-redis';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './ENV';
import { redisClient } from './redis';

const RedisStore = connectRedis(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      name: 'qid',
      secret: ENV.redisSecret,
      resave: false,
      saveUninitialized: false,
      // cookie: { secure: true },
    }),
  );

  app.enableCors({ origin: 'http://localhost:3000', credentials: true });
  app.use(cookieParser());
  await app.listen(4000);
}
bootstrap();
