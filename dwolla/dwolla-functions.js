const dwolla = require('dwolla-v2');

// Navigate to https://dashboard.dwolla.com/applications (production) or https://dashboard-sandbox.dwolla.com/applications (Sandbox) for your application key and secret.
const client = new dwolla.Client({
  key: process.env.DWOLLA_APP_KEY,
  secret: process.env.DWOLLA_APP_SECRET,
  environment: 'sandbox', // optional - defaults to production
});

function generateClientTokenWithBody(body) {
  console.log(body);

  const url = `/client-tokens`;

  return client
    .post(url, body)
    .then((response) => {
      return response.body;
    })
    .catch((error) => {
      return error;
    });
}

export default dwolla;
export { generateClientTokenWithBody };
