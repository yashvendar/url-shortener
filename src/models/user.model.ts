import mongoose, { Model, Schema } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema: Schema<User> = new Schema<User>({
    username: {
        type: String,
        required: [true,"Username is required"]
    },
    password: {
        type: String,
        required: [true,"Password is required"],
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        match: [/.+\@.+\..+/,"Please use a valid email address"]
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const UserModel: Model<User> = mongoose.models.User ?? mongoose.model("User", UserSchema);

export default UserModel;