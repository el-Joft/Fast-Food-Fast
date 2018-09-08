import database from '../data/index';
import { error, parsedInt, isValid } from '../helpers/menuHelper';

const { menus } = database;

class MenuController {
  static listAllMenus(req, res) {
    return res.status(200).json({
      menus,
      status: 'Success',
      message: 'All menus',
    });
  }

  static createAMenu(req, res) {
    const {
      name,
      description,
      image,
      price,
      categoryId,
      isAvailable,
    } = req.body;

    const { statusCode, errMsg } = isValid(req.body);
    if (!errMsg) {
      // Check if the id of the menu and the User is a Number

      const category = parsedInt(req.body.categoryId);
      const Menuprice = parsedInt(req.body.price);
      /* Check if id is a Not a number */
      /* Check if id is  a Not a number */
      if (!(Number.isInteger(category))) {
        return error(res, 400, 'Category is invalid');
      }
      if (!(Number.isInteger(Menuprice))) {
        return error(res, 400, 'Price must be a Number');
      }


      const createMenu = {
        id: menus.length + 1,
        name,
        description,
        image,
        price,
        categoryId,
        isAvailable,
      };
      menus.push(createMenu);
      return res.status(200).json({
        menus,
        status: 'Success',
        message: 'Menu was successfully Created',
      });
    }
    return error(res, statusCode, errMsg);
  }

  static fetchAMenu(req, res) {
    const menuId = req.params.id;
    const parsedId = parsedInt(menuId);
    /* Check if id is  a Not a number */
    if (!(Number.isInteger(parsedId))) {
      return error(res, 400, 'Menu Id is invalid');
    }
    // Look up if it exists or not
    const menu = menus.find(menu => menu.id === parsedId);

    if (!menu) return res.status(404).send('The menu with the given ID was not found');// return 404
    return res.status(200).json({
      menu,
      status: 'Success',
      message: 'Your Menu',
    });
  }

  static updateAMenuStatus(req, res) {
    const { statusCode, errMsg } = isValid(req.body);
    if (!errMsg) {
      const menuId = req.params.id;
      const parsedId = parsedInt(menuId);
      /* Check if id is a Not a number */
      if (!(Number.isInteger(parsedId))) {
        return error(res, 400, 'Menu Id is invalid');
      }

      // const orderIndex = orders.indexOf(order => order.id === parseInt(req.params.orderId, 10));
      // Look up if it exists or not
      const menu = menus.find(order => order.id === parsedInt(req.params.id));
      if (!menu) return res.status(404).send('The menu with the given ID was not found');// return 404

      // Update the menu
      menu.name = req.body.name,
      menu.description = req.body.description,
      menu.image = req.body.image,
      menu.price = req.body.price,
      menu.categoryId = req.body.categoryId,
      menu.isAvailable = req.body.isAvailable;

      return res.status(200).json({
        menu,
        status: 'Success',
        message: 'Menu updated successfully',
      });
    }
    return error(res, statusCode, errMsg);
  }

  static deleteAMenu(req, res) {
    const menu = menus.find(menu => menu.id === parsedInt(req.params.id));
    // Not existing, return 404
    if (!menu) return res.status(404).send('The Menu with the given ID was not found');// return  404
    // Delete
    const index = menus.indexOf(menu);
    menus.splice(index, 1);
    // Return the course
    return res.status(200).json({
      menu,
      status: 'Success',
      message: 'Menu Deleted Successfully',
    });
  }
}


export default MenuController;
