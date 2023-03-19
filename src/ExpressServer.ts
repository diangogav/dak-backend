import express, { Request, Response } from 'express'
import { config } from './config'
import { Logger } from './modules/shared/logger/domain'

export class ExpressServer {
  private readonly express: express.Express
  private readonly port = config.PORT
  private readonly logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
    this.express = express()

    this.express.get('/', (req: Request, res: Response) => {
      res.status(200).json('hello world!')
    })
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.express.listen(this.port, () => {
        this.logger.info(`Aument is alive in port: ${this.port}!`)
        this.logger.info('  Press CTRL-C to stop\n')
        resolve()
      })
    })
  }
}