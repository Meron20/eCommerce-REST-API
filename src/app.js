import express from 'express'
import productRoutes from './routes/products.route.js'
import orderRoutes from './routes/orders.route.js'
import { errorHandler, notFound } from './middleware/error.middleware.js'
import messageRoutes from './routes/message.route.js'
import userRoutes from './routes/user.route.js'
import { verifyToken } from './middleware/auth.middleware.js'


const app = express();

app.use (express.json());

app.use('/api/products', productRoutes )
app.use('/api/orders', verifyToken, orderRoutes )
app.use('/api/messages', messageRoutes )
app.use ('/api/auth', userRoutes)


app.use(notFound);
app.use(errorHandler);


export default app 