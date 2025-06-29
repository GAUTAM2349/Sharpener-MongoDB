const authRouter = require('./auth');
const productRouter = require('./product');
const cartRouter = require('./cart');
const orderRouter = require('./order');


module.exports = {
    authRouter,
    productRouter,
    cartRouter,
    orderRouter
}