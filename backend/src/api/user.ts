import express from 'express';
import { createUser, getAllUsers, getUserById } from '../application/user';

const userRouter = express.Router();

userRouter.route('/').post(createUser).get(getAllUsers)

userRouter.route('/:id').get(getUserById)

export default userRouter