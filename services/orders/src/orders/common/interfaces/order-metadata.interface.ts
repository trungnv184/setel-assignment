export type PayMethod = 'Card' | 'Cash';
export interface OrderInformation {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  notes: string;
  payMethod: PayMethod;
}
