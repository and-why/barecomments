import db from '@/lib/firebase-admin';

const siteData = async (_, res) => {
  const snapshot = await db.collection('sites').get();

  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json({ sites });
};

export default siteData;
