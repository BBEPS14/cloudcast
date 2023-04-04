import mongoose from "mongoose";
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

//const User = mongoose.model("user", userSchema);

const User = mongoose.model.User || mongoose.model("User", userSchema); // <-- export your model
export default User;
// module.exports = mongoose.model('user', userSchema )
