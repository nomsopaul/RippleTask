const { MongoDataSource } = require("apollo-datasource-mongodb");

 class Users extends MongoDataSource {
    async getUsers() {
        return await this.model.find();
    }

    async getUser(id) {
        return await this.findOneById(id);
    }

    async createUser({ username, email, password }) {
        return await this.model.create({ username, email, password });
    }
}
module.exports = {MongoDataSource}