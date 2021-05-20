import { getAllFeedback } from '@/lib/db-admin';

const feedbackData = async (req, res) => {
  const siteId = req.query.siteId;
  const { feedback, error } = await getAllFeedback(siteId);

  if (error) {
    res.status(500).json({ error: error });
  }

  res.status(200).json({ feedback });
};

export default feedbackData;
