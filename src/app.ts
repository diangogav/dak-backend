import { MongoDB } from './modules/shared/db/infrastructure'
import { ExpressServer } from './ExpressServer';
import { WinstonLogger } from './modules/shared/logger/infrastructure/Winston';

const server = new ExpressServer(new WinstonLogger())
const database = new MongoDB(new WinstonLogger())

server.listen()
  .then(async () => {
    await database.connect()
  })

