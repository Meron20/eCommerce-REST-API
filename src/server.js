import app from './app.js'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 9000
const MONGO_URI =process.env.MONGO_URI

const dbConnect = async () => {
 try {
   const mongo = await mongoose.connect(MONGO_URI)
   console.log(`MongoDB Connected: ${mongo.connection.host}`)
 } catch (error) {
    console.log(`Failed to connect: ${error.message}`)
    process.exit(1)
    
 }
}

const startServer = async () => {
    try {
        await dbConnect()
        app.listen(PORT,() => console.log(`Server is running on http://localhost:${PORT}`))
    }   catch(err){
        console.log('Failed to start server:', err.message)
        process.exit(1)
    }
}
startServer()