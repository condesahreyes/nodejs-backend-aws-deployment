const db = require('../db/connection/connection')
const User = db.user

module.exports = class UserRepository {
    async createUser(userData) {
        const user = await User.create({
            userName: userData.userName,
            password: userData.password,
            email: userData.email,
            companyId: userData.companyId,
            role: userData.role
        });
        return user
    }

    async getUserByEmailPassword(email, password) {
        let user = await User.findOne({ where: { email: email } });
        if (user) {
            let isCorrectPassword = await user.isCorrectPassword(password)
            if (isCorrectPassword == true) {
                return user
            } else {
                throw Error('User or password incorrect')
            }
        } else {
            throw Error('User or password incorrect')
        }
    }

    async getUser(userId) {
        return await User.findOne({ where: { id: userId } });
    }

    async getUsers() {
        return await User.findAll();
    }
}