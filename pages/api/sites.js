import { getAllSites } from '@/lib/db-admin';

const siteData = async (_, res) => {
  const { sites, error } = await getAllSites();
  if (error) {
    res.status(500).json({ error: error });
  }
  res.status(200).json({ sites });
};

export default siteData;
