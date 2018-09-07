import database from '../data/index';
import { error, parsedInt, isValid } from '../helpers/helpers';

const { orders } = database;

class OrderController {
  static listAllOrders(req, res) {
    return res.status(200).json({
      AllOrders: orders,
      status: 'Success',
      message: 'All orders',
    });
  }
}


export default OrderController;
