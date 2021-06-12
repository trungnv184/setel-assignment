export type PayMethod = 'Card' | 'Cash';
export interface OrderInformation {
  customerName: string;
  address: string;
  phoneNumber: string;
  payMethod: PayMethod;
}
