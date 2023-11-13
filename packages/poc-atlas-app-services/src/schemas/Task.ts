import Realm from "realm"

export class Task extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  isComplete!: boolean;
  difficulty!: "hard" | "easy";
  createdAt!: Date;

  static schema = {
    name: "Task",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      name: "string",
      isComplete: {type: 'bool', default: false},
      difficulty: "string",
    }
  } as const
}