// src/controllers/LoginController.ts
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { USER } from '../../shared/user';

const TOKEN_SECRET = process.env.JWT_SECRET_KEY || 'defaultsecret';
const TOKEN_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || '3600'; // 1 hour default

export default class LoginController {
  /**
   * Login function that validates user credentials and returns a JWT token.
   * @param req Express Request object
   * @param res Express Response object
   */
  public static async login(req: Request, res: Response)  {

    // res.json({
    //   message: 'Login successful',
    //   token: 'your_generated_jwt_token'
    // });
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      res.status(400).json({
        message: 'Email and password are required'
      });
    }

    // Check credentials (in real-world, use DB and hash comparisons)
    if (email === USER.email && password === USER.password) {
      // Generate a JWT token
      const token = jwt.sign(
        {
          id: USER.id,
          email: USER.email

        },
        TOKEN_SECRET,
        { expiresIn: TOKEN_EXPIRATION_TIME }
      );

      res.status(200).json({
        message: 'Login successful',
        token: token
      });
    }
    if(!res.headersSent) {
        res.status(401).json({
          message: 'Invalid email or password'
        });
    }
  }
}
