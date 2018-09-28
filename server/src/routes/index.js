import OrderController from '../controllers/OrderController';
import Validation from '../helpers/Validation';
import MenuController from '../controllers/MenuController';


const Routes = (router) => {
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
