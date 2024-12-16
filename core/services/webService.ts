import { Request, Response, NextFunction } from 'express';

export default class WebService {

    /**
     * Handle GET requests to the web service.
     *
     * This will render an EJS template with the title
     * 'Web Service || GET method'.
     *
     * @param {Request} req Express Request object
     * @param {Response} res Express Response object
     * @param {NextFunction} next Express NextFunction object
     * @returns {void}
     */
    public static async get(req: Request, res: Response, next: NextFunction) {
        res.render('index', { title: `Web Service || GET method` });
    }
    /**
     * Handle POST requests to the web service.
     *
     * This will render an EJS template with the title
     * 'Web Service || POST method'.
     *
     * @param {Request} req Express Request object
     * @param {Response} res Express Response object
     * @param {NextFunction} next Express NextFunction object
     * @returns {void}
     */
    public static async post(req: Request, res: Response, next: NextFunction) {
        res.render('index', { title: `Web Service || POST method` });
    }
}