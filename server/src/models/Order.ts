import mongoose from "mongoose";

enum OrderStatus {
  Pending = "pending",
  Processing = "processing",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
  Returned = "returned",
  Refunded = "refunded",
}

interface OrderAttrs {
  userId: string;
  cartId: string;
  totalPrice: number;
  address: Object;
  status: OrderStatus;
}

export interface OrderDoc extends mongoose.Document {
  userId: string;
  cartId: string;
  totalPrice: number;
  address: Object;
  status: OrderStatus;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    cartId: {
      type: String,
      required: true,
      index: true,
      default: null,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: Object.values(OrderStatus),
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(ret) {
        delete ret.__v;
      },
    },
  }
);

OrderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", OrderSchema);

export { Order, OrderStatus };
