import createHttpError from 'http-errors';

import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';

export async function authenticate(req, res, next) {
  console.log('Auth!!');

  next();
}
