import { PAYMENT_STATUS } from "@/constants/paymentStatus";
import { ORDER_STATUS } from "@/constants/orderStatus";
import { MIDTRANS_STATUS } from "@/constants/midtransStatus";

export function getPaymentState(transactionStatus) {
  switch (transactionStatus) {

    // SUCCESS
    case MIDTRANS_STATUS.SETTLEMENT:
    case MIDTRANS_STATUS.CAPTURE:
      return {
        payment_status: PAYMENT_STATUS.PAID,
        order_status: ORDER_STATUS.PROCESS,
      };

    // PENDING
    case MIDTRANS_STATUS.PENDING:
      return {
        payment_status: PAYMENT_STATUS.PENDING,
        order_status: ORDER_STATUS.WAITING_PAYMENT,
      };

    // FAILED
    case MIDTRANS_STATUS.DENY:
    case MIDTRANS_STATUS.CANCEL:
    case MIDTRANS_STATUS.EXPIRE:
    case MIDTRANS_STATUS.FAILURE:
      return {
        payment_status: PAYMENT_STATUS.FAILED,
        order_status: ORDER_STATUS.CANCELLED,
      };

    // DEFAULT
    default:
      return {
        payment_status: PAYMENT_STATUS.PENDING,
        order_status: ORDER_STATUS.WAITING_PAYMENT,
      };
  }
}