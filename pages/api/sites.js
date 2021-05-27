import { auth } from '@/lib/firebase-admin';
import { getUserSites } from '@/lib/db-admin';
import { formatObjectKeys, logger } from '@/utils/logger';

const siteData = async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);

    const { sites } = await getUserSites(uid);
    res.status(200).json({ sites });
  } catch (error) {
    logger.info('Getting headers');
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

    res.status(200).json({ error });
  }
};

export default siteData;
