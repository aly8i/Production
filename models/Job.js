import mongoose from "mongoose";
const JobSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      maxlength: 100,
    },
    title: {
        type: String,
        maxlength: 60,
    },
    department: {
        type: String,
        default: null,
        maxlength: 50,
    },
    speciality: {
      type: String,
      default: null,
      maxlength: 50,
    },
    description: {
      type: String,
      default: null,
      maxlength: 3000,
    },
    employmenttype:{
      type: String,
      default: null,
      maxlength: 300,
    },
    salary:{
      type: Number,
      default: null,
      maxlength: 300,
    },
    salaryduration:{
      type: Number,
      default: null,
      maxlength: 300,
    },
    workduration:{
      type: {
        unit: {
          type: String,
          default: null,
          maxlength: 20,
        },
        value: {
          type: Number,
          default: null,
          maxlength: 100,
        }, 
      },
      default: null,
      maxlength: 200,
    },
    workdays:{
      type: [String],
      default: null,
      maxlength: 300,
    },
    workhours:{
      type: Number,
      default: null,
      maxlength: 300,
    },
    workshift:{
      type: String,
      default: null,
      maxlength: 300,
    },
  },
  { timestamps: true }
);
export default mongoose.models.Job ||
  mongoose.model("Job", JobSchema);

