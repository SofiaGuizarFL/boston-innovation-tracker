import mongoose from 'mongoose';

const IndustrySchema = new mongoose.Schema(
  {
    industry_name: {
      type: String,
      required: [true, 'Industry name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      default: '🏢',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Industry || mongoose.model('Industry', IndustrySchema);
