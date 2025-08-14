import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
  imageKitUrl: process.env.IMAGEKIT_URL,
  imageKitPublicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  imageKitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  jwtSecret: process.env.JWT_SECRET,
  tokenExpiration: '2w', // Token expiration set to two weeks
};

export default config;