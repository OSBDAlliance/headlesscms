import logger from "../../shared/utils/logger";
import {Request, Response} from 'express';
import { ENV_CONFIG } from "../../config/environment";

export default class HelloWorldRouteController {
    /**
     * Hello World endpoint.
     * This endpoint is a simple example of a route and
     * returns the name of the application.
     * @param req Express Request object
     * @param res Express Response object
     * @returns response with status 200 and the name of the application
     */
    public static async hola (req: Request, res: Response) {
        logger.info("HelloWorldRouteController is successfully initiated");
        // you can validate the request here

        // call the service for business logic

        // send json response
        res.status(200).json({
            message: `Hello World from ${ENV_CONFIG.APP_NAME}`,
            environment: ENV_CONFIG.APP_ENVIRONMENT
        });
    }
}