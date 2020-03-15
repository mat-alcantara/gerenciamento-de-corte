import mongoose from 'mongoose';

const cutDetailsSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    side1: {
      type: Number,
      required: true,
    },
    side2: {
      type: Number,
      required: true,
    },
    border1: {
      type: Number,
      required: true,
    },
    border2: {
      type: Number,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

export default cutDetailsSchema;
