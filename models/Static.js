import mongoose from "mongoose";
const StaticSchema = new mongoose.Schema(
  {
    talents:{
      type: [String],
      default: null,
      maxlength: 3000,
    },
    crews:{
      type: [String],
      default: null,
      maxlength: 3000,
    },
    providers:{
      type: [String],
      default: null,
      maxlength: 3000,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Static ||
  mongoose.model("Static", StaticSchema);
