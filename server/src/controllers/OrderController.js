import database from '../data/index';

const { orders } = database;

class OrderController {
  static listAllOrders(req, res) {
    return res.status(200).json({
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
    return res.status(200).json({
      order: orders,
      status: 'Success',
      message: 'Order was successfully made',
    });
  }

  static fetchAnOrder(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: 'User Id is Invalid' });
    }
    const order = orders.find(element => element.id === parseInt(id, 10));
    if (!order) {
      return res.status(404).json({ message: 'The order with the given ID was not found' });
    }
    return res.json({
      order,
      status: 'Success',
      message: 'Your Order',
    });
  }

  static updateAnOrderStatus(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: 'User Id is Invalid' });
    }
    // Look up if it exists or not
    const order = orders.find(order => order.id === parseInt(req.params.id, 10));

    // if (!order) res.status(404).send('The order with the given ID was not found');// return 404
    if (!order) {
      return res.status(404).json({ message: 'The order with the given ID was not found' });
    }
    // Update the Order
    order.menuId = req.body.menuId;
    order.timeOrdered = req.body.timeOrdered;
    order.dateOrdered = req.body.dateOrdered;
    order.orderedBy = req.body.orderedBy;
    order.quantity = req.body.quantity;
    order.totalPrice = req.body.totalPrice;

    return res.status(200).json({
      order,
      status: 'Success',
      message: 'Order updated successfully',
    });
  }

  static deleteAnOrder(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: 'OrderId is Invalid' });
    }
    const order = orders.find(order => order.id === parseInt(req.params.id, 10));
    // Not existing, return 404
    if (!order) {
      return res.status(404).json({ message: 'The order with the given ID was not found' });
    }
    // Delete
    const index = orders.indexOf(order);
    orders.splice(index, 1);
    // Return the course
    return res.status(200).json({
      order,
      status: 'Success',
      message: 'Order Deleted Successfully',
    });
  }
}


export default OrderController;
