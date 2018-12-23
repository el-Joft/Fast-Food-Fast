import { find, categoryText } from '../helpers/queryHelpers';
import pool from '../config/databaseConfig';

class CategoryController {
  static listAllCategory(req, res) {
    pool.query(('SELECT * FROM category'), (err, response) => {
      if (err) {
        const payload = {
          message: 'Could not establish database connection',
          error: err.stack,
        };
        res.status(500).json(payload);
      } else if (response.rowCount > 0) {
        const result = response.rows;
        res.status(200).json({
          result,
        });
      } else {
        res.status(404).json({
          message: 'Category Not Found',
        });
      }
    });
  }

  static createACategory(req, res) {
    const {
      name,
    } = req.body;


    const values = [
      name,
    ];
    pool.query(categoryText, values, (err, response) => {
      if (err) {
        res.status(500).json({
          message: 'Could not successfully create a category',
          error: err.stack,
        });
      } else {
        const result = response.rows[0];
        res.status(201).json({
          result,
          status: 'Success',
          message: 'Category was successfully Created',
        });
      }
    });
  }

  static fetchACategory(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      res.status(400).json({ message: 'Category Id is Invalid' });
    } else {
      pool.query(find('*', 'category', 'id', id), (err, response) => {
        if (err) {
          res.status(500).send('Could not establish database connection');
        } else {
          const result = response.rows[0];
          if (result.length) {
            res.json({
              result,
              status: 'Success',
              message: 'Your Menu',
            });
          } else {
            res.json({
              status: 404,
              message: 'Catgeory with the Id not found',
            });
          }
        }
      });
    }
  }

  static getMenuCategory(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      res.status(400).json({ message: 'Category Id is Invalid' });
    }
    pool.query(find('*', 'menus', 'categoryid', id), (err, response) => {
      if (err) {
        res.status(500).send('Could not establish database connection');
      } else {
        const result = response.rows;
        console.log(result);

        if (!result) {
          res.status(404).json({
            message: 'No category Found',
          });
        } else {
          res.status(200).json({ result });
        }
      }
    });
  }
}


export default CategoryController;
