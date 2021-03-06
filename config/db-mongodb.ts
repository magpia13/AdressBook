import mongoose, {ConnectOptions} from 'mongoose'
import keys from './keys'

export default async () => {
  try {
    await mongoose.connect(
      keys.mongodbUrl as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    )
    console.log('MongoDB connected')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
