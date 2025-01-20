// ./src/app/api/users/handler.ts
import { User, UserInput } from '@/lib/models/user';
import { connectDB } from '@/lib/connectDatabase';

// Create User
export async function createUser(body: UserInput) {
    await connectDB();
    const newUser = new User(body);
    return newUser.save();
}

// Get All Users
export async function getAllUsers() {
    await connectDB();
    return User.find();
}
