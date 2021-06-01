import { getAllFeedback, getSite } from '@/lib/db-admin';

const feedbackData = async (req, res) => {
  const siteId = req.query.siteId;
  const { feedback, error } = await getAllFeedback(siteId);
  const { site } = await getSite(siteId);

  if (error) {
    logger.info(
      {
        request: {
          headers: formatObjectKeys(req.headers),
          url: req.url,
          method: req.method
        },
        response: {
          statusCode: res.statusCode
        }
      },
      error.message
    );

    res.status(500).json({ error: error });
  }

  res.status(200).json({ feedback, site });
};

export default feedbackData;
