const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5174", 
        "http://localhost:5173", 
        "https://shehzadi-clothing-frontend.vercel.app/" // ADD YOUR VERCEL URL HERE
    ],
    credentials: true
}));

app.use(express.json());


app.use(cookieParser())

/* require all the routes */
const authRouter = require('./routes/auth.routes')
const productRouter = require('./routes/product.routes')
const cartRouter = require('./routes/cart.routes')
const orderRouter = require('./routes/order.routes')

/* using all the routes here */
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);



module.exports = app;