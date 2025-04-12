import mongoose from "mongoose";

const ROLES = {
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    USER: 'user'
}

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required:true, unique: true, lowercase: true },
    password: {type: String, required: true},
    role: {
        type: String,
        enum: [...Object.values(ROLES)],
        default: ROLES.USER
    },
   

  }, {timestamps: true })

  const User = mongoose.model('User', userSchema);
  export default User;



