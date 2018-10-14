import swaggerUi from 'swagger-ui-express';
import OrderController from '../controllers/OrderController';
import Validation from '../helpers/Validation';
import MenuController from '../controllers/MenuController';
import UserController from '../controllers/UserController';
import { ensureAutheticated } from '../middlewares/authentication/authMiddleware';
import isAdmin from '../middlewares/authentication/isAdminMiddleware';
import swaggerDocument from '../../../swagger.json';
import CategoryController from '../controllers/CategoryController';

const Routes = (router) => {
  router.post('/api/v1/auth/signup', Validation.createUserValidation, UserController.createUser);
  router.post('/api/v1/auth/login', Validation.loginUserValidation, UserController.loginUser);

  router.route('/api/v1/users/:id/orders')
    .get(OrderController.fetchAnOrderByUser)
    .put(Validation.createOrUpdateOrderValidation, OrderController.updateAnOrderStatus);

  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  router.route('/api/v1/category')
    .get(CategoryController.listAllCategory)
    .post(Validation.createCategoryValidation, CategoryController.createACategory);

  router.route('/api/v1/orders')
    .get(isAdmin, ensureAutheticated, OrderController.listAllOrders)
    .post(Validation.createOrUpdateOrderValidation, OrderController.placeAnOrder);

  router.route('/api/v1/menus')
    .get(MenuController.listAllMenus)
    .post(isAdmin, ensureAutheticated, Validation.createOrUpdateMenuValidation, MenuController.createAMenu);

  router.route('/api/v1/orders/:id')
    .get(ensureAutheticated, OrderController.fetchAnOrder)
    .put(isAdmin, ensureAutheticated, Validation.adminUpdateOrderStatusValidation, OrderController.adminUpdateOrderStatus)
    .delete(isAdmin, ensureAutheticated, OrderController.deleteAnOrder);

  router.route('/api/v1/menus/:id')
    .get(MenuController.fetchAMenu)
    .put(isAdmin, ensureAutheticated, Validation.createOrUpdateMenuValidation, MenuController.updateAMenuStatus)
    .delete(isAdmin, ensureAutheticated, MenuController.deleteAMenu);
};

export default Routes;
