import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TodoSchema = Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  time: { type: Number, default: Date.now }
})

export default mongoose.model('Todo', TodoSchema);