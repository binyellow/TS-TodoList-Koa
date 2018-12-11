import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: { type: String, required: true },
  passWord: { type: String, required: true },
  registerTime: { type: Number, default: Date.now }
})

export default mongoose.model('User', UserSchema);