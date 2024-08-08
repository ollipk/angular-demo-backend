import mongoose, { Document, Schema } from 'mongoose';

const options = { discriminatorKey: 'type', collection: 'task' };

export interface TaskDocument extends Document {
  text: string;
  day: string;
  reminder?: boolean;
}

const TaskSchema: Schema<TaskDocument> = new Schema({
  text: { type: String, required: true },
  day: { type: String, required: true },
  reminder: { type: Boolean }
}, options);

const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema);


export default TaskModel;