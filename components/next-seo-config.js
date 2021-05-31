const title =
  'Bare Comments - a bare bones way to add comments to your static site!';
const description =
  "Bare Comments was built whilst following LeeRob's React 2025 coure";

const SEO = {
  title,
  description,
  canonical: 'https://www.barecomments.vercel.app/',
  openGraph: {
    url: 'https://www.barecomments.vercel.app/',
    title,
    description,
    images: [
      {
        url: 'https://www.barecomments.vercel.app/favicons/favicon-32x32.png',
        width: 32,
        height: 32,
        alt: 'Bare Comments Logo'
      }
    ],
    site_name: 'SiteName'
  }
};

export default SEO;
