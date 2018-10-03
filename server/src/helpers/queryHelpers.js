
export const findAllOrder = (selectedColumn, tableName) => (`SELECT ${selectedColumn} FROM ${tableName}`);

export const userText = 'INSERT INTO users(firstName, lastName, email, phone, password, address, city, zipCode) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
