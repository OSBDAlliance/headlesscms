// src/routes/index.ts
import express, { Request, Response, NextFunction } from 'express';
import HelloWorldRouteController from '../controllers/HelloWorldRouteController';
import LoginController from '../controllers/LoginController';  // Importing LoginController class
import WSController from '../controllers/WSController';
import auth from "../../shared/middlewares/authMiddleware";
import { ENV_CONFIG } from '../../config/environment';

var router = express.Router();

// Welcome route
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: `Hello World from ${ENV_CONFIG.APP_NAME}` });
});

// WebSocket route (protected)
router.all(
  '/ws/*',
  auth(),
  WSController.index
);

// Content route
router.get('/content', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Hello World' });
});

// HelloWorld API route
router.get('/api', HelloWorldRouteController.hola);

// Login route (POST request)
router.post('/login', LoginController.login);

export default router;
