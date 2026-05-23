import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    headquarters_location: {
      type: String,
      required: [true, 'Headquarters location is required'],
      trim: true,
    },
    industry: {
      type: String,
      required: [true, 'Industry is required'],
      trim: true,
    },
    founded_year: {
      type: Number,
      min: 1800,
      max: new Date().getFullYear(),
    },
    employee_size: {
      type: String,
      enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+'],
    },
    description: {
      type: String,
      trim: true,
    },
    website_url: {
      type: String,
      trim: true,
    },
    logo_url: {
      type: String,
      trim: true,
    },
    tags: [String],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Company || mongoose.model('Company', CompanySchema);
