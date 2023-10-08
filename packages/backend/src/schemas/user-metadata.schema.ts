import mongoose, {Schema} from "mongoose";

export const UserMetadataSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, required: true},
  colorSchema: {type: String, required: true},
}, {timestamps: true})

export const UserMetadataModel = mongoose.model('UserMetadata', UserMetadataSchema)