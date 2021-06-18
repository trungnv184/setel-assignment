import { Prop } from '@nestjs/mongoose';

export class OrderMetaData {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  address: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  payMethod: string;
}
