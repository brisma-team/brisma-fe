const generateCaptcha = () => {
  const captcha = Math.random().toString(36).substring(2, 8);
  return captcha;
};

export default generateCaptcha;
