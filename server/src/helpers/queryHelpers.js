
export const findAllOrder = (selectedColumn, tableName) => (`SELECT ${selectedColumn} FROM ${tableName}`);
export const userText = 'INSERT INTO users(firstName, lastName, email, phone, password, address, city, zipCode) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
export const orderText = 'INSERT INTO orders(menuId, orderedBy, quantity, totalPrice) VALUES($1, $2, $3, $4) RETURNING *';
export const find = (selectedColumn, tableName, columnName, value) => (`SELECT ${selectedColumn} FROM ${tableName} WHERE ${columnName} = '${value}'`);
export const deleteOrder = (id, tableName) => (`DELETE FROM ${tableName} WHERE Id = ${id}`);
export const menuText = 'INSERT INTO menus(name, description, image, price, categoryId, isAvailable) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
