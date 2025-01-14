import logger from "../../shared/utils/logger";
import { Request, Response, NextFunction } from 'express';
import { ENV_CONFIG } from "../../config/environment";
import WebService from "../services/webService";

export default class WSController {

    /**
     * Main entry point for the web service.
     * This endpoint is a simple example of a route and
     * returns the name of the application.
     * @param req Express Request object
     * @param res Express Response object
     * @param next Express NextFunction object
     * @returns response with status 200 and the name of the application
     */
    public static async index(req: Request, res: Response, next: NextFunction) {
        const method = req.method; // HTTP method (GET, POST, etc.)
        const uri = req.params[0]; // URI string after "/ws/"

        // Handle your logic here
        if (method === 'GET') {
            WebService.get(req, res, next);
        } else if (method === 'POST') {
            WebService.post(req, res, next);
        } else {
            res.status(405).send(`Method ${method} not allowed`);
        }
    }

}