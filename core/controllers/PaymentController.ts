import { Request, Response } from 'express';
import { PaymentService } from '../services/PaymentService';

export class PaymentController {
    private paymentService: PaymentService;

    constructor() {
        this.paymentService = new PaymentService();
    }

    async createPayment(req: Request, res: Response): Promise<void> {
        try {
            const paymentData = {
                ...req.body,
                userAgent: req.headers['user-agent'],
                userIP: req.ip
            };

            const payment = await this.paymentService.createPayment(paymentData);

            res.status(201).json({
                success: true,
                message: 'Payment created successfully',
                data: payment
            });
        } catch (error) {
            this.handleError(res, error, 'Error creating payment');
        }
    }

    async getPayment(req: Request, res: Response): Promise<void> {
        try {
            const payment = await this.paymentService.getPaymentById(req.params.paymentId);

            res.json({
                success: true,
                data: payment
            });
        } catch (error) {
            if (error.message === 'Payment not found') {
                res.status(404).json({
                    success: false,
                    message: 'Payment not found'
                });
                return;
            }
            this.handleError(res, error, 'Error fetching payment');
        }
    }

    async getCustomerPayments(req: Request, res: Response): Promise<void> {
        try {
            const payments = await this.paymentService.getCustomerPayments(
                req.params.customerId
            );

            res.json({
                success: true,
                data: payments
            });
        } catch (error) {
            this.handleError(res, error, 'Error fetching customer payments');
        }
    }

    async updatePaymentStatus(req: Request, res: Response): Promise<void> {
        try {
            const { status, amount_paid } = req.body;
            await this.paymentService.updatePaymentStatus(
                req.params.paymentId,
                status,
                amount_paid
            );

            res.json({
                success: true,
                message: 'Payment status updated successfully'
            });
        } catch (error) {
            if (error.message === 'Payment not found') {
                res.status(404).json({
                    success: false,
                    message: 'Payment not found'
                });
                return;
            }
            this.handleError(res, error, 'Error updating payment status');
        }
    }

    async processPayment(req: Request, res: Response): Promise<void> {
        try {
            const { paymentMethodId, paymentDetails } = req.body;
            await this.paymentService.processPayment(
                req.params.paymentId,
                paymentMethodId,
                paymentDetails
            );

            res.json({
                success: true,
                message: 'Payment processed successfully'
            });
        } catch (error) {
            this.handleError(res, error, 'Error processing payment');
        }
    }

    private handleError(res: Response, error: Error, logMessage: string): void {
        console.error(`${logMessage}:`, error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}