import { find, categoryText } from '../helpers/queryHelpers';
import pool from '../config/databaseConfig';

class CategoryController {
  static listAllCategory(req, res) {
    pool.query(('SELECT * FROM category'), (err, response) => {
      if (err) {
        res.status(500).send('Could not establish database connection');
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
        console.log(err.stack);
        res.status(500).json({
          message: 'Could not successfully create a category',
          error: err.stack,
        });
      } else {
        const result = response.rows[0];
        res.status(200).json({
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
          if (result) {
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
        console.log(err);
        res.status(500).send('Could not establish database connection');
      } else {
        const result = response.rows[0];
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

  // static updateAMenuStatus(req, res) {
  //   const { id } = req.params;
  //   if (isNaN(id)) {
  //     res.status(400).json({ message: 'Order Id is Invalid' });
  //   } else {
  //     pool.query(find('*', 'menus', 'id', id), (err, response) => {
  //       if (err) {
  //         console.log(err);
  //         res.status(500).send('Could not establish database connection');
  //       } else {
  //         const result = response.rows[0];
  //         if (result) {
  //           const {
  //             name,
  //             description,
  //             image,
  //             price,
  //             categoryid,
  //             isAvailable,
  //           } = req.body;
  //           const values = [
  //             name,
  //             description,
  //             image,
  //             price,
  //             categoryid,
  //             isAvailable,
  //           ];
  //           pool.query(`
  //           UPDATE menus SET name = $1, description= $2, image = $3, price = $4, categoryId = $5, isAvailable= $6
  //           WHERE id = ${id} returning *`, values, (error, responses) => {
  //             if (error) {
  //               res.status(500).send('Could not establish database connection');
  //               console.log(error);
  //             } else {
  //               const results = responses.rows[0];
  //               res.status(200).json({
  //                 results,
  //                 status: 'Success',
  //                 message: 'Menu was updated successfully',
  //               });
  //             }
  //           });
  //         } else {
  //           res.status(404).json({
  //             message: 'Menu Id Not Found',
  //           });
  //         }
  //       }
  //     });
  //   }
  // }


  // static deleteAMenu(req, res) {
  //   const { id } = req.params;

  //   if (isNaN(id)) {
  //     res.status(400).json({ message: 'Menu Id is Invalid' });
  //   } else {
  //     pool.query(find('*', 'menus', 'id', id), (err, response) => {
  //       if (err) {
  //         res.status(500).send('Could not establish database connection');
  //       } else {
  //         const result = response.rows[0];
  //         if (result) {
  //           pool.query(deleteOrder(id, 'menus'), (error, responses) => {
  //             if (error) {
  //               res.status(500).send('Could not establish database connection');
  //             } else {
  //               const results = responses.rows[0];
  //               res.status(200).json({
  //                 results,
  //                 status: 'Success',
  //                 message: 'Deleted',
  //               });
  //             }
  //           });
  //         } else {
  //           res.status(404).send('The Menu Id cannot be found');
  //         }
  //       }
  //     });
  //   }
  // }
}


export default CategoryController;
