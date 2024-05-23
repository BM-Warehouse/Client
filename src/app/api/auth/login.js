import axios from 'axios';

const secret = process.env.RECAPTCHA_SECRET_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { recaptchaToken } = req.body;

  if (!recaptchaToken) {
    return res.status(400).json({ message: 'reCAPTCHA token is missing' });
  }

  try {
    // Verify reCAPTCHA token
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret,
        response: recaptchaToken
      }
    });

    const { success } = response.data;
    if (!success) {
      return res.status(400).json({ message: 'reCAPTCHA verification failed' });
    }

    // reCAPTCHA verification succeeded
    res.status(200).json({ message: 'reCAPTCHA verification succeeded' });
  } catch (error) {
    console.error('Error verifying reCAPTCHA', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
