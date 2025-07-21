import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/user.js';

export const registerUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });

  if (user !== null) {
    throw new createHttpError.Conflict('email');
  }

  return await UserCollection.create(payload);
};
