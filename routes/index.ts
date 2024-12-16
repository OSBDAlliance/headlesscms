import express, { Application, Request, Response, NextFunction } from 'express';
import HelloWorldRouteController from '../core/controllers/HelloWorldRouteController';
import WSController from '../core/controllers/WSController';
var router = express.Router();
// import auth from '../shared/middlewares/authMiddleware';
import auth from "../shared/middlewares/authMiddleware";



/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
    res.render('index', { title: 'Hello World' });
});
router.all(
    '/ws/*',
    auth(),
    WSController.index
);
router.get('/content', function (req: Request, res: Response, next: NextFunction) {
    res.render('index', { title: 'Hello World' });
});
router.get('/api', HelloWorldRouteController.hola);

export default router;
