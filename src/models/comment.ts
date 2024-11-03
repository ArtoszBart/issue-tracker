import { Comment } from '@prisma/client';
import User from './user';

export default interface IComment extends Comment {
	author: User;
}
