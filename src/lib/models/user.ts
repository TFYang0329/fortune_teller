// ./src/lib/models/user.ts
import mongoose, {Schema, Document, Model} from 'mongoose';

// 定义 Schema
const UserSchema: Schema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    is_blocked: {type: Boolean, default: false},
});

// 定义输入类型
export interface UserInput {
    username: string;
    email: string;
    password: string;
}

// 定义 Mongoose 文档接口
export interface UserDocument extends UserInput, Document {
    created_at: Date;
    updated_at: Date;
    is_blocked: boolean;
}

// 定义 Mongoose 模型类型
export const User: Model<UserDocument> =
    mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);

// Get User by ID
export async function getUserById(id: string) {
    return User.findById(id);
}

// Update User by ID
export async function updateUserById(id: string, body: UserInput) {
    return User.findByIdAndUpdate(id, body, {new: true});
}

// Delete User by ID
export async function deleteUserById(id: string) {
    return User.findByIdAndDelete(id);
}