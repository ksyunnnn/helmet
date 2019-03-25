import { createClient } from 'contentful';

const SPACE_ID = 'jy34ychllsdy';
const ACCESS_TOKEN = '4f0fb8f8ceabfb6974cae18d9a30a8583f685f2a4f0ba69852d1e6fd95594269';

export default createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN,
});
