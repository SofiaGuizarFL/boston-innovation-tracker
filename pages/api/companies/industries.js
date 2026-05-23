import dbConnect from '../../../lib/dbConnect';
import Industry from '../../../models/Industry';
import Company from '../../../models/Company';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const industries = await Industry.find({}).lean();

      // Attach company count to each industry
      const withCounts = await Promise.all(
        industries.map(async (ind) => ({
          ...ind,
          company_count: await Company.countDocuments({ industry: ind.industry_name }),
        }))
      );

      return res.status(200).json({ success: true, data: withCounts });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
}
