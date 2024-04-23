import mongoose from "mongoose";
import { Password } from "../services/password";

// an interface that describes the properties
// that are required to create a new User
interface userAttrs {
  email: string;
  password: string;
}

// an interface that describes the properties
// that user Model has
interface userModel extends mongoose.Model<userDoc> {
  build(attrs: userAttrs): userDoc;
}

// an interface that describes the properties
// that a User Document has
interface userDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

userSchema.statics.build = (attrs: userAttrs) => {
  return new User(attrs);
}

const User = mongoose.model<userDoc, userModel>("User", userSchema);

export { User };
