import dbConnect from '../../../lib/dbConnect';
import Project from '../../../models/project';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET allowed' });
  }

  try {
    const { id } = req.query;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: 'DB 조회 실패' });
  }
}