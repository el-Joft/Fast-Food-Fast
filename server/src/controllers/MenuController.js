import { find, deleteOrder, menuText } from '../helpers/queryHelpers';
import pool from '../config/databaseConfig';

class MenuController {
  static listAllMenus(req, res) {
    pool.query(('SELECT * FROM menus'), (err, response) => {
      if (err) {
        res.status(500).send('Could not establish database connection');
      } else if (response.rowCount > 0) {
        const result = response.rows;
        res.status(200).json({
          result,
          // status: 'Success',
          // message: 'Your Menus',
        });
      } else {
        res.status(404).json({
          message: 'Menu Not Found',
        });
      }
    });
  }

  static createAMenu(req, res) {
    const {
      name,
      description,
      image,
      price,
      categoryid,
      isAvailable,
    } = req.body;


    const values = [
      name,
      description,
      image,
      price,
      categoryid,
      isAvailable,
    ];
    pool.query(menuText, values, (err, response) => {
      if (err) {
        console.log(err.stack);
        res.status(500).json({
          message: 'Could not successfully create a Menu',
          error: err.stack,
        });
      } else {
        const result = response.rows[0];
        res.status(201).json({
          result,
          status: 'Success',
          message: 'Menu was successfully Created',
        });
      }
    });
  }

  static fetchAMenu(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      res.status(400).json({ message: 'Menu Id is Invalid' });
    } else {
      pool.query(find('*', 'menus', 'id', id), (err, response) => {
        if (err) {
          res.status(500).send('Could not establish database connection');
        } else {
          const result = response.rows[0];
          if (result) {
            res.json({
              result,
              status: 'Success',
              message: 'Your Menu',
            });
          } else {
            res.json({
              status: 404,
              message: 'Menu with the Id not found',
            });
          }
        }
      });
    }
  }

  static updateAMenuStatus(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      res.status(400).json({ message: 'Menu Id is Invalid' });
    } else {
      pool.query(find('*', 'menus', 'id', id), (err, response) => {
        if (err) {
          console.log(err);
          res.status(500).send('Could not establish database connection');
        } else {
          const result = response.rows[0];
          if (result) {
            const {
              name,
              description,
              image,
              price,
              categoryid,
              isAvailable,
            } = req.body;
            const values = [
              name,
              description,
              image,
              price,
              categoryid,
              isAvailable,
            ];
            pool.query(`
            UPDATE menus SET name = $1, description= $2, image = $3, price = $4, categoryId = $5, isAvailable= $6
            WHERE id = ${id} returning *`, values, (error, responses) => {
              if (error) {
                res.status(500).send('Could not establish database connection');
                console.log(error);
              } else {
                const results = responses.rows[0];
                res.status(200).json({
                  results,
                  status: 'Success',
                  message: 'Menu was updated successfully',
                });
              }
            });
          } else {
            res.status(404).json({
              message: 'Menu Id Not Found',
            });
          }
        }
      });
    }
  }


  static deleteAMenu(req, res) {
    const { id } = req.params;

    if (isNaN(id)) {
      res.status(400).json({ message: 'Menu Id is Invalid' });
    } else {
      pool.query(find('*', 'menus', 'id', id), (err, response) => {
        if (err) {
          res.status(500).send('Could not establish database connection');
        } else {
          const result = response.rows[0];
          if (result) {
            pool.query(deleteOrder(id, 'menus'), (error, responses) => {
              if (error) {
                res.status(500).send('Could not establish database connection');
              } else {
                const results = responses.rows[0];
                res.status(200).json({
                  results,
                  status: 'Success',
                  message: 'Deleted',
                });
              }
            });
          } else {
            res.status(404).send('The Menu Id cannot be found');
          }
        }
      });
    }
  }
}


export default MenuController;
