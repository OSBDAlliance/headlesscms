import express from 'express';
import { PaymentController } from '../controllers/PaymentController';
import { validatePaymentRequest } from '../../shared/middlewares/validation';

const router = express.Router();
const paymentController = new PaymentController();

router.post('',
    validatePaymentRequest,
    (req, res) => paymentController.createPayment(req, res)
);

router.get('/:paymentId',
    (req, res) => paymentController.getPayment(req, res)
);

router.get('/customers/:customerId/payments',
    (req, res) => paymentController.getCustomerPayments(req, res)
);

router.put('/:paymentId/status',
    (req, res) => paymentController.updatePaymentStatus(req, res)
);

router.post('/:paymentId/process',
    (req, res) => paymentController.processPayment(req, res)
);

export default router;

