const uuid = require('uuid');
const sequelize = require('../connection/connection')

module.exports = (sequelize, DataTypes, Product, Sale, Company) => {
    const ProductSale = sequelize.define('productSale', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Product,
                key: 'id'
            },
        },
        saleId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Sale,
                key: 'id'
            },
        },
        companyId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Company,
                key: 'id',
            },
        },
        productQuantity: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        productCost: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });

    return ProductSale;
}