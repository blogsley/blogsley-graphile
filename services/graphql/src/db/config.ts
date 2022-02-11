import { ConnectionOptions } from "typeorm";

/*var host;
if(!process.env.IN_DOCKER) {
  host = 'localhost'
} else {
  host = process.env.POSTGRES_HOST
}*/

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  //host,
  port: Number(process.env.POSTGRES_HOST_PORT) || 5432,
  username: process.env.POSTGRES_USER || "blogsley",
  password: process.env.POSTGRES_PASSWORD || "blogsley",
  database: process.env.POSTGRES_DB || "blogsley",
  entities: ['**/*.entity.ts', 'src/**/*.entity.ts'],
  synchronize: true,
};

export default config;