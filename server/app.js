import express from "express";
import { config } from "dotenv";
import userRouter from './routes/user.js'
import sellerRouter from './routes/seller.js'
import ProductRouter from './routes/product.js'
import cartRouter from './routes/cart.js'
import addressRouter from './routes/address.js'
import OrderRouter from './routes/order.js'
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import connectCloud from "./config/cloud.js";

config(); // ✅ Load .env first

const app = express();

await connectDB();
await connectCloud();

// works only if your file is an ES module and Node.js supports top-level await

// allow multiple origins
const allowedOrigins = ['http://localhost:5173'];

// middleware config
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get('/', (req, res) => {
  res.send('API Working');
});

app.use('/api/user', userRouter);

app.use('/api/seller', sellerRouter);

app.use('/api/product', ProductRouter);

app.use('/api/cart', cartRouter);

app.use('/api/address', addressRouter);

app.use('/api/order', OrderRouter);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
