import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly confirmPassword: string;
}
