import dbConnect from '../../../lib/dbConnect';
import Company from '../../../models/Company';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const total = await Company.countDocuments();

      const byIndustry = await Company.aggregate([
        { $group: { _id: '$industry', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);

      const bySize = await Company.aggregate([
        { $group: { _id: '$employee_size', count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]);

      const byDecade = await Company.aggregate([
        { $match: { founded_year: { $exists: true, $ne: null } } },
        {
          $group: {
            _id: { $multiply: [{ $floor: { $divide: ['$founded_year', 10] } }, 10] },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      return res.status(200).json({
        success: true,
        data: { total, byIndustry, bySize, byDecade },
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
}
