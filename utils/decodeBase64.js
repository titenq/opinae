const decodeBase64 = value => {
  const buffer = Buffer.from(value, 'base64');
  
  return buffer.toString('ascii');
};

export default decodeBase64;
