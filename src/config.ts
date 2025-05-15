import "dotenv/config";

export const {
  PORT,
  SECRET_KEY,
  FE_URL,
  FE_LOCAL_URL,
  CLOUDINARY_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
  NODEMAILER_USER,
  NODEMAILER_PASS,
} = process.env;
