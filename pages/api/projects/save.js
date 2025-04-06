// pages/api/projects/save.js
import dbConnect from '../../../lib/dbConnect';
import Project from '../../../models/project';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect();
      const project = await Project.create(req.body);
      return res.status(201).json({ success: true, id: project._id });
    } catch (error) {
      console.error('Error saving project:', error);
      return res.status(500).json({ success: false, error: '서버 에러' });
    }
  } else {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}