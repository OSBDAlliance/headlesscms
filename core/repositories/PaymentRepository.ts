// repositories/PaymentRepository.ts
import { BaseRepository } from '../../config/database';
import { Payment } from '../../core/models/payment';
import { v4 as uuidv4 } from 'uuid';

const x = {
    "serviceCode": "NETFLIX",
    "rateCodeId": "RATE001",
    "paymentMethodId": "PM001",
    "customerId": "CUST001",
    "amount": 29.99,
    "userAgent": "Mozilla/5.0",
    "userIP": "192.168.1.1",
    "email": "customer@email.com",
    "mobile": "+1234567890"
}
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

export class PaymentRepository extends BaseRepository {
    async createPayment(paymentRequest: PaymentRequest): Promise<Payment> {
        try {
            // Log incoming request
            console.log('Incoming payment request:', paymentRequest);
            const payload = {
                "serviceCode": paymentRequest.serviceCode,
                "rateCodeId": paymentRequest.rateCodeId,
                "paymentMethodId": paymentRequest.paymentMethodId,
                "customerId": paymentRequest.customerId,
                "amount": paymentRequest.amount,
                "userAgent": paymentRequest.userAgent,
                "userIP": paymentRequest.userIP,
                "email": paymentRequest.email,
                "mobile": paymentRequest.mobile
            }

            // Format the request exactly as expected by the stored procedure
            const paymentJson = JSON.stringify(payload);

            // Log the formatted JSON for debugging
            console.log('Calling InitialPayment with JSON:', paymentJson);

            // Call the stored procedure with the single JSON parameter
            const result = await this.callStoredProcedure('InitialPayment', [paymentJson]);

            if (!result || !result[0]) {
                throw new Error('No data returned from payment creation');
            }

            return result[0];
        } catch (error) {
            console.error('Error details:', error);
            throw new Error(`Payment creation failed: ${error.message}`);
        }
    }

    async findById(paymentId: string): Promise<Payment | null> {
        try {
            const result = await this.callStoredProcedure('sp_GetPaymentById', [paymentId]);
            return result[0] || null;
        } catch (error) {
            console.error('Error in findById:', error);
            throw new Error(`Failed to fetch payment: ${error.message}`);
        }
    }

    async findByCustomerId(customerId: string): Promise<Payment[]> {
        try {
            const result = await this.callStoredProcedure('sp_GetCustomerPayments', [customerId]);
            return result[0] || [];
        } catch (error) {
            console.error('Error in findByCustomerId:', error);
            throw new Error(`Failed to fetch customer payments: ${error.message}`);
        }
    }

    async updatePayment(paymentId: string, payment: Partial<Payment>): Promise<boolean> {
        try {
            const result = await this.callStoredProcedure('sp_UpdatePayment', [
                paymentId,
                payment.paymentStatus,
                payment.serviceId,
                payment.rateCodeId,
                payment.rateCodeGroupId,
                payment.paymentMethodId,
                payment.amount,
                payment.amount_paid,
                payment.networkInfo ? JSON.stringify(payment.networkInfo) : null,
                payment.reference,
                payment.name,
                payment.email,
                payment.mobile
            ]);
            return result[0]?.affectedRows > 0;
        } catch (error) {
            console.error('Error in updatePayment:', error);
            throw new Error(`Failed to update payment: ${error.message}`);
        }
    }

    async updateStatus(
        paymentId: string,
        status: string,
        amount_paid: number
    ): Promise<boolean> {
        try {
            const result = await this.callStoredProcedure('sp_UpdatePaymentStatus', [
                paymentId,
                status,
                amount_paid,
                new Date()
            ]);
            return result[0]?.affectedRows > 0;
        } catch (error) {
            console.error('Error in updateStatus:', error);
            throw new Error(`Failed to update payment status: ${error.message}`);
        }
    }

    async processPayment(
        paymentId: string,
        paymentMethodId: string,
        paymentDetails: any
    ): Promise<boolean> {
        try {
            const now = new Date();
            const responseResult = JSON.stringify({ status: 'success' });

            await this.callStoredProcedure('sp_ProcessPayment', [
                paymentId,
                paymentMethodId,
                JSON.stringify(paymentDetails),
                now,
                now,
                responseResult
            ]);

            return true;
        } catch (error) {
            console.error('Error in processPayment:', error);
            throw new Error(`Payment processing failed: ${error.message}`);
        }
    }

    async bulkCreatePayments(payments: PaymentRequest[]): Promise<Payment[]> {
        try {
            const paramsArray = payments.map(payment => {
                const paymentData = {
                    paymentId: uuidv4(),
                    paymentStatus: 'PENDING',
                    creationDateTime: new Date(),
                    serviceId: payment.serviceCode,
                    rateCodeId: payment.rateCodeId,
                    paymentMethodId: payment.paymentMethodId,
                    customerId: payment.customerId,
                    amount: payment.amount,
                    userAgent: payment.userAgent,
                    userIP: payment.userIP,
                    email: payment.email,
                    mobile: payment.mobile
                };

                return [
                    paymentData.paymentId,
                    paymentData.paymentStatus,
                    paymentData.creationDateTime,
                    paymentData.serviceId,
                    paymentData.rateCodeId,
                    paymentData.paymentMethodId,
                    paymentData.customerId,
                    paymentData.amount,
                    paymentData.userAgent,
                    paymentData.userIP,
                    paymentData.email,
                    paymentData.mobile
                ];
            });

            return this.callBatchStoredProcedure<Payment>(
                'sp_CreatePayment',
                paramsArray,
                1000
            );
        } catch (error) {
            console.error('Error in bulkCreatePayments:', error);
            throw new Error(`Bulk payment creation failed: ${error.message}`);
        }
    }

    async bulkUpdateStatus(paymentIds: string[], status: string): Promise<number> {
        try {
            const result = await this.callStoredProcedure('sp_BulkUpdatePaymentStatus', [
                JSON.stringify(paymentIds),
                status
            ]);
            return result[0]?.affectedRows || 0;
        } catch (error) {
            console.error('Error in bulkUpdateStatus:', error);
            throw new Error(`Bulk status update failed: ${error.message}`);
        }
    }
}