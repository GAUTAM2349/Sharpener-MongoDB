const express = require('express');
const connectMongoDB = require('./util/database');
const { productRouter, authRouter, cartRouter, orderRouter } = require('./routes');

const app = express();
app.use(express.json());

connectMongoDB(); 

app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/order',orderRouter);

app.listen(3003, () => {
  console.log('Server running on port 3003');
});
