import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    fruitId: {
      type: Number,
      required: true,
    },
    fruitName: {
      type: String,
      required: true,
    },
    fruitType: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  {
    timestamps: {
      currentTime: () => Math.floor(Date.now() / 1000),
    },
  }
);

export default mongoose.model("IFruit", Schema);
