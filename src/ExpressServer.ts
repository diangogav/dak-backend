import 'express-async-errors'
import express, { Request, Response } from 'express'
import { Definition, YamlFileLoader } from 'node-dependency-injection'
import { config } from './config'
import container from './dependency-injection'
import { DomainEvent } from './modules/shared/event-bus/domain/DomainEvent'
import { DomainEventSubscriber } from './modules/shared/event-bus/domain/DomainEventSubscriber'
import { EventBus } from './modules/shared/event-bus/domain/EventBus'
import { Logger } from './modules/shared/logger/domain'
import { RegisterRoutes } from './routes/routes'

export class ExpressServer {
  private readonly express: express.Express
  private readonly port = config.PORT
  private readonly logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
    this.express = express()
    this.express.use(express.json())
    this.express.get('/', (req: Request, res: Response) => {
      res.status(200).json('hello world!')
    })
    RegisterRoutes(this.express)
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

  async registerSubscribers() {
    const eventBus = container.get('Shared.EventBus') as EventBus
    const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<string, Definition>
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = []
    subscriberDefinitions.forEach((_value: unknown, key: string) => subscribers.push(container.get(key)))
    eventBus.addSubscribers(subscribers)
  }
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}