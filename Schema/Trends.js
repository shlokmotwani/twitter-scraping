import mongoose from "mongoose";
const Schema = mongoose.Schema;
const trendsSchema = new Schema(
  {
    title0: {
      type: String,
      require: true,
    },
    title1: {
      type: String,
      require: true,
    },
    title2: {
      type: String,
      require: true,
    },
    title3: {
      type: String,
      require: true,
    },
    ipAddress: {
      type: String,
      require: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Trend = mongoose.model("Trend", trendsSchema);

export { Trend };
