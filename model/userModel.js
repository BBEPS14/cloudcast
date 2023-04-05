import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
