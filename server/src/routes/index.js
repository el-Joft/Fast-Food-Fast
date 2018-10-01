import OrderController from '../controllers/OrderController';
import Validation from '../helpers/Validation';
import MenuController from '../controllers/MenuController';
import pool from '../config/databaseConfig';
import OrdersController from '../pgControllers/ordersController';


const Routes = (router) => {
  router.get('/', (req, res) => {
    pool.query('SELECT NOW()', (err, response) => {
      console.log(err, response);
      pool.end();
    });
    res.status(200).json({ message: 'Welcome to fast food fast' });
  });

  router.get('/test', OrdersController.listAllOrders);

  router.route('/api/v1/orders')
    .get(OrderController.listAllOrders)
    .post(Validation.createOrUpdateOrderValidation, OrderController.placeAnOrder);

  router.route('/api/v1/menus')
    .get(MenuController.listAllMenus)
    .post(Validation.createOrUpdateMenuValidation, MenuController.createAMenu);

  router.route('/api/v1/orders/:id')
    .get(OrderController.fetchAnOrder)
    .put(Validation.createOrUpdateOrderValidation, OrderController.updateAnOrderStatus)
    .delete(OrderController.deleteAnOrder);

  router.route('/api/v1/menus/:id')
    .get(MenuController.fetchAMenu)
    .put(Validation.createOrUpdateMenuValidation, MenuController.updateAMenuStatus)
    .delete(MenuController.deleteAMenu);
};


export default Routes;
