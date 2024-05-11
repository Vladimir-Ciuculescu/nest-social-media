import { Request } from 'express';

export interface User {
  userId: number;
  email: string;
}

export interface NestRequest extends Request {
  user: User;
}
