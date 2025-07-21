import { registerUser } from '../service/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    staus: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};
