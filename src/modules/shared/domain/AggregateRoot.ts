export abstract class AggregateRoot {
  abstract toPrimitives(): { [key: string]: unknown }
}