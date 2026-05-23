import dbConnect from '../../../lib/dbConnect';
import Company from '../../../models/Company';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  switch (req.method) {
    case 'GET': {
      try {
        const company = await Company.findById(id).lean();
        if (!company) return res.status(404).json({ success: false, message: 'Company not found' });
        return res.status(200).json({ success: true, data: company });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    case 'PUT': {
      try {
        const company = await Company.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!company) return res.status(404).json({ success: false, message: 'Company not found' });
        return res.status(200).json({ success: true, data: company });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    }

    case 'DELETE': {
      try {
        const company = await Company.findByIdAndDelete(id);
        if (!company) return res.status(404).json({ success: false, message: 'Company not found' });
        return res.status(200).json({ success: true, message: 'Company deleted' });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
  }
}
