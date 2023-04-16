const db = require('../db/connection/connection')
const Purchase = db.purchase

module.exports = class PurchaseRepository {
    async createPurchase(productData) {
        const purchase = await Purchase.create({
            date: productData.date,
            providerId: productData.providerId,
            totalcost: productData.totalcost,
        });
        return purchase
    }

    async getPurchase(purchaseId) {
        return await Purchase.findOne({ where: { id: purchaseId } });
    }

    async getPurchases() { 
        return await Purchase.findAll();
    }

}