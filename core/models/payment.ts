export interface IPayment {
    paymentId: string;
    paymentStatus: string;
    creationDateTime: Date;
    serviceId: string;
    rateCodeId?: string;
    rateCodeGroupId?: string;
    paymentMethodId?: string;
    customerId: string;
    amount?: number;
    amount_paid?: number;
    networkInfo?: string;
    userAgent?: string;
    retryAttempt?: number;
    networkMetered?: string;
    networkDownlinkMax?: string;
    networkDownlink?: string;
    networkRtt?: string;
    networkSaveData?: string;
    networkSpeed?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    country?: string;
    city?: string;
    userIP?: string;
    PM_IP?: string;
    operator_by_ip?: string;
    msisdn?: string;
    operator_by_msisdn?: string;
    Final_Operator?: string;
    PM_response_date_time?: Date;
    serviceTransactionId?: string;
    pMethodTransactionId?: string;
    pSystemRequestDateTime?: Date;
    pSystemResponeDateTime?: Date;
    pSystemRequest?: string;
    pSystemResponse?: string;
    pMethodRequestDateTime?: Date;
    pMethodResponseDateTime?: Date;
    pMethodRequest?: string;
    pMethodResponseResult?: string;
    reference?: string;
    name?: string;
    email?: string;
    mobile?: string;
    orderId?: number;
    traxId?: string;
    pmgwTraxID?: string;
    pmgwRecurID?: string;
    access_token?: string;
}

// src/models/Payment.ts


export class Payment implements IPayment {
    paymentId: string;
    paymentStatus: string;
    creationDateTime: Date;
    serviceId: string;
    rateCodeId?: string;
    rateCodeGroupId?: string;
    paymentMethodId?: string;
    customerId: string;
    amount?: number;
    amount_paid?: number;
    networkInfo?: string;
    userAgent?: string;
    retryAttempt?: number;
    networkMetered?: string;
    networkDownlinkMax?: string;
    networkDownlink?: string;
    networkRtt?: string;
    networkSaveData?: string;
    networkSpeed?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    country?: string;
    city?: string;
    userIP?: string;
    PM_IP?: string;
    operator_by_ip?: string;
    msisdn?: string;
    operator_by_msisdn?: string;
    Final_Operator?: string;
    PM_response_date_time?: Date;
    serviceTransactionId?: string;
    pMethodTransactionId?: string;
    pSystemRequestDateTime?: Date;
    pSystemResponeDateTime?: Date;
    pSystemRequest?: string;
    pSystemResponse?: string;
    pMethodRequestDateTime?: Date;
    pMethodResponseDateTime?: Date;
    pMethodRequest?: string;
    pMethodResponseResult?: string;
    reference?: string;
    name?: string;
    email?: string;
    mobile?: string;
    orderId?: number;
    traxId?: string;
    pmgwTraxID?: string;
    pmgwRecurID?: string;
    access_token?: string;

    constructor(data: Partial<IPayment>) {
        this.paymentId = data.paymentId!;
        this.paymentStatus = data.paymentStatus!;
        this.creationDateTime = data.creationDateTime!;
        this.serviceId = data.serviceId!;
        this.customerId = data.customerId!;
        Object.assign(this, data);
    }
}