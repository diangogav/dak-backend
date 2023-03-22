import { Model, Document } from 'mongoose'
import { AggregateRoot } from '../../../domain/AggregateRoot';

export abstract class BaseMongooseRepository<T> {
  private readonly model: Model<Document>;

  protected constructor(model: Model<Document>) {
    this.model = model;
  }

  async create(entity: AggregateRoot): Promise<void> {
    await this.model.create(entity.toPrimitives());
  }

  async update(id: string, entity: AggregateRoot): Promise<void> {
    await this.model.updateOne(
      { id },
      { $set: entity.toPrimitives() },
      { upsert: true }
    );
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
}
