import { generateClientTokenWithBody } from '../../dwolla/dwolla-functions';

export default async function handler(req, res) {
  const response = await generateClientTokenWithBody(req.body);

  res.send({ token: response.token });
}
