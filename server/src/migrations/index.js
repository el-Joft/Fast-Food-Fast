import createOrderTables from './ordersMigrations';
import createMenusTables from './menusMigrations';
import createUsersTables from './userMigrations';

createUsersTables();
createMenusTables();
createOrderTables();
