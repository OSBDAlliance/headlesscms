import { Request, Response, NextFunction } from 'express';

export const validatePaymentRequest = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // const { serviceId, customerId, amount } = req.body;

    // if (!serviceId || !customerId || !amount) {
    //     res.status(400).json({
    //         success: false,
    //         message: 'Missing required fields: serviceId, customerId, and amount are mandatory'
    //     });
    //     return;
    // }

    // if (isNaN(amount) || amount <= 0) {
    //     res.status(400).json({
    //         success: false,
    //         message: 'Invalid amount'
    //     });
    //     return;
    // }

    next();
};
