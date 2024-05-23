/* eslint-disable consistent-return */
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
    // Verify reCAPTCHA token using Fetch API
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`;
    const response = await fetch(verifyUrl, {
      method: 'POST'
    });

    const data = await response.json();
    const { success } = data;

    if (!success) {
      return res.status(400).json({ message: 'reCAPTCHA verification failed' });
    }

    res.status(200).json({ message: 'reCAPTCHA verification succeeded' });
  } catch (error) {
    console.error('Error verifying reCAPTCHA', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
