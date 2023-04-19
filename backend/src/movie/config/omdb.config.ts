import { registerAs } from '@nestjs/config';

export default registerAs('omdb', () => {
  // I could use joi here to validate the config
  // but for the sake of simplicity I am skipping it
  if (!process.env.OMDB_API_KEY) {
    throw new Error('OMDB_API_KEY is not defined');
  }

  return {
    apiKey: process.env.OMDB_API_KEY,
  };
});
