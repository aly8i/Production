import mongoose from "mongoose";
const StaticSchema = new mongoose.Schema(
  {
    cubeslider:{
      type: [String],
      default: null,
    },
    servicecards:{
      type: [{
        title: {
          type: String,
          default: null,
          maxlength:30,
        },
        description: {
          type: String,
          default: null,
        },
        image: {
          type: String,
          default: null,
        },
      }],
      default: null,
    },
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
    facebook:{
      type: String,
      default: null,
      maxlength: 3000,
    },
    instagram:{
      type: String,
      default: null,
      maxlength: 3000,
    },
    linkedin:{
      type: String,
      default: null,
      maxlength: 3000,
    },
    twitter:{
      type: String,
      default: null,
      maxlength: 3000,
    },
    leftquote:{
      type: String,
      default: null,
      maxlength: 3000,
    },
    rightquote:{
      type: String,
      default: null,
      maxlength: 3000,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Static ||
  mongoose.model("Static", StaticSchema);
