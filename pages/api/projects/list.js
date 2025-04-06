// pages/api/projects/list.js
import dbConnect from '../../../lib/dbConnect';
import Project from '../../../models/project';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    res.status(200).json({ projects });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}