require('dotenv').config();
const Sequelize = require("sequelize");
const { DataTypes } = require('sequelize');
const dbUri = process.env.MY_SQL_URI || "localhost";
const dbPassword = process.env.DB_PASSWORD;
const User = require('../models/users')
const Company = require('../models/company')
const Provider = require('../models/provider')
const Product = require('../models/product')
const Purchase = require('../models/purchase')
const ProductPurchase = require('../models/productPurchase')
const Sale = require('../models/sale')
const ProductSale = require('../models/productSale')
const SaleReport = require('../models/saleReport')
const logger = require('../../logger/systemLogger')

const sequelize = new Sequelize(
    process.env.MY_SQL_DATABASE_NAME,
    process.env.MY_SQL_USERNAME,
    dbPassword,
     {
       host: dbUri,
       dialect: 'mysql'
     }
   );

sequelize
  .authenticate()
  .then(() => {
    logger.logInfo('Sequelize Connection has been established successfully.')
  })
  .catch((error) => {
    logger.logInfo('Unable to connect to the database: ', error)
  })

sequelize
  .addHook('afterConnect', (connection) => {
    connection.on('error', (error) => {
      logger.logError('Sequelize connection error:', error)
    });
  
    connection.on('end', () => {
      logger.logError('Sequelize connection disconnected.')
    });
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.company = Company(sequelize, DataTypes);
db.user = User(sequelize, DataTypes, db.company);
db.provider = Provider(sequelize, DataTypes, db.company);
db.product = Product(sequelize, DataTypes, db.company);
db.purchase = Purchase(sequelize, DataTypes, db.company,db.provider);
db.productPurchase = ProductPurchase(sequelize, DataTypes, db.product, db.purchase, db.company);
db.sale = Sale(sequelize, DataTypes, db.company);
db.productSale = ProductSale(sequelize, DataTypes, db.product, db.sale, db.company);
db.saleReport = SaleReport(sequelize, DataTypes, db.company, db.product);

module.exports = db;
