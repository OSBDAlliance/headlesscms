import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserById } from '../models/User';
import { createSession, deleteSession } from '../models/Session';
import { log } from 'console';

export const login = async (req: Request, res: Response): Promise<void> => {
  console.log('Request Body:', req.body);
  const { userId, password } = req.body;
  const user = await findUserById(userId);
  if (!user || !(await bcrypt.compare(password, user.pass))) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign({ userId: user.userId }, 'secret', { expiresIn: '1h' });
  await createSession(user.userId, token);

  res.json({ token });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  console.log(userId);
  if (!userId) {
    res.status(400).json({ message: 'Invalid user' });
    return;
  }

  await deleteSession(userId);
  res.json({ message: 'Logged out successfully' });
};
