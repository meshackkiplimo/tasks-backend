import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  date: Date;
  task: string;
  learned: string;
  conclusion: string;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    task: { type: String, required: true },
    learned: { type: String, required: true },
    conclusion: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
