import { Payment } from '../models/payment';
import { PaymentRepository } from '../repositories/PaymentRepository';

interface PaymentRequest {
    serviceCode: string;
    rateCodeId: string;
    paymentMethodId: string;
    customerId: string;
    amount: number;
    userAgent?: string;
    userIP?: string;
    email?: string;
    mobile?: string;
}
export class PaymentService {
    private paymentRepository: PaymentRepository;

    constructor() {
        this.paymentRepository = new PaymentRepository();
    }

    async createPayment(paymentData: PaymentRequest): Promise<Payment> {
        try {
                        return await this.paymentRepository.createPayment(paymentData);
        } catch (error) {
            throw new Error(`Failed to create payment: ${error.message}`);
        }
    }

    async getPaymentById(paymentId: string): Promise<Payment | null> {
        try {
            const payment = await this.paymentRepository.findById(paymentId);
            if (!payment) {
                throw new Error('Payment not found');
            }
            return payment;
        } catch (error) {
            throw new Error(`Failed to fetch payment: ${error.message}`);
        }
    }

    async getCustomerPayments(customerId: string): Promise<Payment[]> {
        try {
            return await this.paymentRepository.findByCustomerId(customerId);
        } catch (error) {
            throw new Error(`Failed to fetch customer payments: ${error.message}`);
        }
    }

    async updatePaymentStatus(paymentId: string, status: string, amountPaid: number): Promise<boolean> {
        try {
            const success = await this.paymentRepository.updateStatus(paymentId, status, amountPaid);
            if (!success) {
                throw new Error('Payment not found');
            }
            return true;
        } catch (error) {
            throw new Error(`Failed to update payment status: ${error.message}`);
        }
    }

    async processPayment(paymentId: string, paymentMethodId: string, paymentDetails: any): Promise<boolean> {
        try {
            // Add any business logic/validation here before processing
            this.validatePaymentDetails(paymentDetails);

            const success = await this.paymentRepository.processPayment(
                paymentId,
                paymentMethodId,
                paymentDetails
            );

            if (!success) {
                throw new Error('Payment processing failed');
            }

            return true;
        } catch (error) {
            throw new Error(`Failed to process payment: ${error.message}`);
        }
    }

    private validatePaymentDetails(paymentDetails: any): void {
        if (!paymentDetails.amount || paymentDetails.amount <= 0) {
            throw new Error('Invalid payment amount');
        }
        // Add more validation as needed
    }
}
