import { Database } from '../../domain';
import mongoose from 'mongoose'
import { Logger } from '../../../logger/domain';
import { config } from '../../../../../config';

export class MongoDB implements Database {
  private readonly logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
  }

  async connect(): Promise<void> {
    await mongoose.connect(config.MONGO_URL, {
      keepAlive: true
    })

    this.logger.info('Conectado a la base de datos')
  }
}

