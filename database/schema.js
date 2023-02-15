import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

const UserScm = models.userData || model("userData", UserSchema);

export default UserScm;
