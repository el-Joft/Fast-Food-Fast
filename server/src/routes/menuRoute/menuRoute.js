import express from 'express';
import { json, urlencoded } from 'body-parser';
import MenuController from '../../controllers/MenuController';

const menuRoute = express();


// orderRoute(orderRoute);
// for parsing application/json
menuRoute.use(json());

// for parsing application/x-ww-form-urlencoded
menuRoute.use(urlencoded({ extended: false }));


menuRoute.route('/')

/* Get all orders */

  .get(MenuController.listAllMenus)
  .post(MenuController.createAMenu);

menuRoute.route('/:id')

/* Fetch a specific Order */
  .get(MenuController.fetchAMenu)
  .put(MenuController.updateAMenuStatus)
  .delete(MenuController.deleteAMenu);


export default menuRoute;
