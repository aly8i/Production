import mongoose from "mongoose";
const EquipmentSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
      maxlength: 60,
    },
    title: {
        type: String,
        maxlength: 60,
    },
    image: {
        type: [String],
        default: null,
        maxlength: 8000,
    },
    tags: {
      type: [String],
      default: null,
      maxlength: 8000,
    },
    article:{
      type: String,
      default: null,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Equipment ||
  mongoose.model("Equipment", EquipmentSchema);
