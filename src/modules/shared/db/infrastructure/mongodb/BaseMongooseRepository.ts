import { Model, Document } from 'mongoose'
import { AggregateRoot } from '../../../domain/AggregateRoot';

export abstract class BaseMongooseRepository<T> {
  private readonly model: Model<Document>

  protected constructor(model: Model<Document>) {
    this.model = model
  }

  async create(entity: AggregateRoot): Promise<void> {
    await this.model.create(entity.toPrimitives())
  }

  // async count(query: QueryOptions): Promise<number> {
  //   const count = await this.model.countDocuments(query.filter).exec()
  //   return parseInt(count.toString())
  // }

  // async get<T>(query: QueryOptions): Promise<T[]> {
  //   const data = await this.model
  //     .find(query.filter)
  //     .select(query.select)
  //     .skip(query.skip * query.limit)
  //     .limit(query.limit)
  //     .sort(query.sort)
  //     .exec()

  //   return data.map((element: any) => {
  //     const entity = this.instantiate({ ...element.toObject() })
  //     return entity as T
  //   })
  // }

  // async findBy<T, U>(filter: U): Promise<T | null> {
  //   if (typeof filter !== 'object' || !filter) {
  //     return null
  //   }
  //   const data = await this.model.findOne(filter).exec()
  //   if (!data) {
  //     return null
  //   }
  //   return this.instantiate({ ...data.toObject() }) as T
  // }

  // async delete<T, U>(filter: U): Promise<number> {
  //   if (typeof filter !== 'object' || !filter) {
  //     return 0
  //   }
  //   const count = (await this.model.deleteOne(filter).exec()).deletedCount
  //   if (count == null) {
  //     return 0
  //   }
  //   return count
  // }

  // async update<T extends { _id?: string }>(entity: T): Promise<void> {
  //   if (typeof entity !== 'object' || !entity) {
  //     return
  //   }

  //   const { _id, ...rest } = entity
  //   const data = await this.model.findById(_id).exec()
  //   const dbEntity: { [key: string]: string } = { ...data?.toObject() }
  //   if (!data) {
  //     return
  //   }

  //   const entityInPathNotation = objectToPathNotation(dbEntity)

  //   const nullKeys = Object.keys(entityInPathNotation)
  //     .filter(item => entityInPathNotation[item] === null)

  //   const payload = objectToPathNotation(rest)
  //   let payloadKeys: string[] = Object.keys(payload)
  //   const fixedPayload: { [key: string]: unknown } = {}
  //   nullKeys.forEach((key) => {
  //     payloadKeys = payloadKeys.filter((payloadKey) => !payloadKey.startsWith(`${key}.`))
  //     const keys = key.split('.')
  //     const values: { key: string, value: unknown }[] = []
  //     const value = keys.reduce((a, key) => {
  //       try {
  //         if (a[key] !== null && a[key] !== undefined) {
  //           values.push({
  //             key,
  //             value: a[key]
  //           })
  //           return a[key]
  //         }
  //       } catch (error: any) {
  //         console.log(error?.message)
  //       }
  //     }, rest as Record<string, any>)
  //     const path = values.map(item => item.key).join('.')
  //     payloadKeys = payloadKeys.filter((payloadKey) => !payloadKey.startsWith(`${path}.`))
  //     fixedPayload[<string>path] = values?.pop()?.value
  //   })

  //   payloadKeys.forEach((key) => {
  //     fixedPayload[key] = payload[key]
  //   })


  //   const { createdAt, ...sanitizedPayload } = fixedPayload

  //   if (!_id) { throw new ServerError('Entity without id') }

  //   await this.doUpdate(_id, sanitizedPayload)

  // }

  // private async doUpdate(_id: string, payload: { [key: string]: unknown }) {
  //   try {
  //     await this.model
  //       .updateMany(
  //         {
  //           _id
  //         },
  //         {
  //           $set: payload
  //         },
  //         {
  //           upsert: true
  //         }
  //       )
  //       .exec()
  //   } catch (error: any) {
  //     console.log('update error', error?.message)
  //     if (error?.code === 40) {
  //       const match = error?.message?.match(/(["'])(?:(?=(\\?))\2.)*?\1/g) || [error?.message?.split(' ')[2], error?.message?.split(' ')[4]]
  //       const keys = match.map((key: string) => key.replace(/(['"])/g, ''))
  //       console.log('keys', keys)
  //       // const uniqueKeys = Array.from(new Set(keys))
  //       const initialPayloadKeys: string[] = Object.keys(payload)
  //       const payloadKeys = initialPayloadKeys.filter((payloadKey) => !payloadKey.startsWith(`${keys[1]}.`))
  //       const fixedPayload: { [key: string]: unknown } = {}
  //       payloadKeys.forEach((key) => {
  //         fixedPayload[key] = payload[key]
  //       })
  //       await this.doUpdate(_id, fixedPayload)
  //     } else {
  //       throw error
  //     }
  //   }
  // }

  // async insertMany<T>(entities: T[]): Promise<void> {
  //   await this.model.insertMany(entities)
  // }
}
