import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;
process.on('uncaughtException', (error) => {
  console.error('uncaughtException is detected , shutting down', error);
  process.exit(1);
});
// console.log(object);
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Database connection error:', error);
  }
}
main();

process.on('unhandledRejection', (reason) => {
  console.error(`unhandledRejection is detected , shutting down ...${reason}`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Promise.reject(object);
