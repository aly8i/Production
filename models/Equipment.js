import mongoose from "mongoose";
const EquipmentSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
      maxlength: 60,
    },
    name: {
        type: String,
        maxlength: 60,
    },
    images: {
        type: [String],
        default: null,
        maxlength: 8000,
    },
    tags: {
      type: [String],
      default: null,
      maxlength: 8000,
    },
    category:{
      type: String,
      default: null,
      maxlength: 50,
    },
    price:{
      type: Number,
      default: null,
      maxlength: 300,
    },
    for:{
      type: String,
      default: null,
      maxlength: 50,
    },
    rentduration:{
      type: Number,
      default: null,
      maxlength: 50,
    },
    warranty:{
      type: String,
      default: null,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Equipment ||
  mongoose.model("Equipment", EquipmentSchema);
