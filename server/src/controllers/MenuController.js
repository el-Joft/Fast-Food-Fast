import database from '../data/index';

const { menus } = database;

class MenuController {
  static listAllMenus(req, res) {
    res.status(200).json({
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

  static fetchAMenu(req, res) {
    const menuId = req.params.id;
    const parsedId = parseInt(menuId, 10);
    /* Check if id is  a Not a number */
    if (isNaN(menuId)) {
      res.status(400).send('Menu Id is Invalid');
    }
    // Look up if it exists or not
    const menu = menus.find(menu => menu.id === parsedId);

    if (!menu) res.status(404).send('The menu with the given ID was not found');// return 404
    res.status(200).json({
      menu,
      status: 'Success',
      message: 'Your Menu',
    });
  }

  static updateAMenuStatus(req, res) {
    // Look up if it exists or not
    const menu = menus.find(order => order.id === parseInt(req.params.id, 10));
    if (!menu) res.status(404).send('The menu with the given ID was not found');// return 404

    // Update the menu
    menu.name = req.body.name,
    menu.description = req.body.description,
    menu.image = req.body.image,
    menu.price = req.body.price,
    menu.categoryId = req.body.categoryId,
    menu.isAvailable = req.body.isAvailable;

    res.status(200).json({
      menu,
      status: 'Success',
      message: 'Menu updated successfully',
    });
  }

  static deleteAMenu(req, res) {
    const menuId = req.params.id;
    if (isNaN(menuId)) {
      res.status(400).send('Menu Id is Invalid');
    }
    const menu = menus.find(menu => menu.id === parseInt(req.params.id, 10));
    // Not existing, return 404
    if (!menu) res.status(404).send('The Menu with the given ID was not found');// return  404
    // Delete
    const index = menus.indexOf(menu);
    menus.splice(index, 1);
    // Return the course
    res.status(200).json({
      menu,
      status: 'Success',
      message: 'Menu Deleted Successfully',
    });
  }
}


export default MenuController;
