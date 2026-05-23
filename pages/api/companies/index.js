import dbConnect from '../../../lib/dbConnect';
import Company from '../../../models/Company';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET': {
      try {
        const { industry, search, employee_size, sort = 'name', page = 1, limit = 12 } = req.query;

        const filter = {};
        if (industry) filter.industry = industry;
        if (employee_size) filter.employee_size = employee_size;
        if (search) {
          filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { tags: { $regex: search, $options: 'i' } },
          ];
        }

        const sortOptions = {};
        if (sort === 'name') sortOptions.name = 1;
        else if (sort === 'newest') sortOptions.founded_year = -1;
        else if (sort === 'oldest') sortOptions.founded_year = 1;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await Company.countDocuments(filter);
        const companies = await Company.find(filter)
          .sort(sortOptions)
          .skip(skip)
          .limit(parseInt(limit))
          .lean();

        return res.status(200).json({
          success: true,
          data: companies,
          pagination: {
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            pages: Math.ceil(total / parseInt(limit)),
          },
        });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    case 'POST': {
      try {
        const company = await Company.create(req.body);
        return res.status(201).json({ success: true, data: company });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
  }
}
