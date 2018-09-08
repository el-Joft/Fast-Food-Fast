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

  
}


export default MenuController;
