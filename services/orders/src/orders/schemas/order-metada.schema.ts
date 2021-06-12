import { Prop } from '@nestjs/mongoose';

export class OrderMetaData {
  @Prop()
  customerName: string;

  @Prop()
  address: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  payMethod: string;
}
