import * as express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();

const bodyParser = require('body-parser')

// create application/json parser
const jsonParser = bodyParser.json()

const cheeses = require('./data/cheeses.json');

// Get cheeses data
router.get('/api/cheeses', (req, res, next) => {
  return res.json(cheeses);
});

// Save orders
router.post('/api/order', jsonParser, async (req, res, next) => {
  // Read and set initial value of the orders file.
  let ordersArray = []

  try {
    const stringRead = await fs.readFile('src/server/data/orders.json', 'utf-8')
    if (stringRead.length) {
      ordersArray = JSON.parse(stringRead);
    }
  } catch (e) {
    console.error('read file error', e.message)
    return res.status(500).json({
      success: false,
      message: e.message
    });
  }
  // Push the latest order into orders file.
  const { newOrder } = req.body
  ordersArray.push(newOrder)
  try {
    await fs.writeFile('src/server/data/orders.json', JSON.stringify(ordersArray), 'utf-8')
  } catch (e) {
    console.error('writeFile error', e.message)
    return res.status(500).json({
      success: false,
      message: e.message
    });
  }
  return res.status(200).json({
    success: true,
    message: 'Order saved successfully.'
  });
});


// Get recently purchased order.
router.get('/api/recentOrder', async (req, res, next) => {
// Read the orders file.
  let ordersArray = []
  try {
    const stringRead = await fs.readFile('src/server/data/orders.json', 'utf-8')
    if (stringRead.length) {
      ordersArray = JSON.parse(stringRead);
    }
  } catch (e) {
    console.error('read file error', e.message)
    return res.status(500).json({
      success: false,
      message: e.message
    });
  }
// Get the recent order.
  const recentOrder = ordersArray.pop();
  return res.status(200).json({
    success: true,
    order: recentOrder
  });
});


export default router;
