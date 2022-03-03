import { ConnectionOptions } from 'typeorm';

const isDevEnv = process.env.NODE_ENV === 'dev';

export const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'password',
  database: 'forms',
  entities: isDevEnv
    ? ['src/entity/**/*.entity{.ts,.js}']
    : ['dist/entity/**/*.entity{.ts,.js}'],

  synchronize: true,
  migrationsRun: false,
  migrations: isDevEnv
    ? ['migrations/**/*{.ts,.js}']
    : ['dist/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: isDevEnv ? 'migrations' : 'dist/migrations',
  },
};
