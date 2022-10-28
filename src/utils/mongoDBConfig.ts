import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const path = String(process.env.MONGODB_URI)
mongoose
  .connect(path)
  .then(() => console.log('Connected to Database'))
  .catch(err => console.log(err.message))
