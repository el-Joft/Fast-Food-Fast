import database from '../data/index';

const { orders } = database;

class OrderController {
  static listAllOrders(req, res) {
    res.status(200).json({
      AllOrders: orders,
      status: 'Success',
      message: 'All orders',
    });
  }

  static placeAnOrder(req, res) {
    const {
      menuId,
      timeOrdered,
      dateOrdered,
      orderedBy,
      quantity,
      totalPrice,
    } = req.body;

    
    const ItemOrdered = {
      id: orders.length + 1,
      menuId,
      timeOrdered,
      dateOrdered,
      orderedBy,
      quantity,
      totalPrice,
    };
    orders.push(ItemOrdered);
    res.status(200).json({
      order: orders,
      status: 'Success',
      message: 'Order was successfully made',
    });
  }


  static fetchAnOrder(req, res) {
    const orderId = req.params.id;

    if (isNaN(orderId)) {
      res.status(400).json('User Id is Invalid');
    }
    // Look up if it exists or not
    const order = orders.find(order => order.id === parseInt(orderId, 10));

    if (!order) res.status(404).send('The order with the given ID was not found');// return 404
    res.status(200).json({
      order,
      status: 'Success',
      message: 'Your Order',
    });
  }

  static updateAnOrderStatus(req, res) {
    const orderId = req.params.id;

    if (isNaN(orderId)) {
      res.status(400).json('User Id is Invalid');
    }
    // Look up if it exists or not
    const order = orders.find(order => order.id === parseInt(req.params.id, 10));

    if (!order) res.status(404).send('The order with the given ID was not found');// return 404

    // Update the Order
    order.menuId = req.body.menuId;
    order.timeOrdered = req.body.timeOrdered;
    order.dateOrdered = req.body.dateOrdered;
    order.orderedBy = req.body.orderedBy;
    order.quantity = req.body.quantity;
    order.totalPrice = req.body.totalPrice;

    res.status(200).json({
      order,
      status: 'Success',
      message: 'Order updated successfully',
    });
  }

  static deleteAnOrder(req, res) {
    const orderId = req.params.id;
    if (isNaN(orderId)) {
      res.status(400).send('OrderId is Invalid');
    }
    const order = orders.find(order => order.id === parseInt(req.params.id, 10));
    // Not existing, return 404
    if (!order) res.status(404).send('The Order with the given ID was not found');// return  404
    // Delete
    const index = orders.indexOf(order);
    orders.splice(index, 1);
    // Return the course
    res.status(200).json({
      order,
      status: 'Success',
      message: 'Order Deleted Successfully',
    });
  }
}


export default OrderController;
