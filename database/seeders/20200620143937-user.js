'use strict';
const faker = require('faker');
const { date } = require('faker');
module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
        let data = [];

        let amount = 50;
        while (amount--) {
            let date = new Date();
            data.push({
                email: faker.internet.email(),
                userName: faker.internet.userName(),
                password: faker.internet.password(),
                role: faker.internet.role,
                avatar: faker.internet.avatar(),
                createdAt: date,
                updatedAt: date,
                phone: null,
            });
        }
        let date = new Date();
        data.push({
            email: 'admin@gmail.com',
            userName: 'admin',
            password: 'admin',
            createdAt: date,
            updatedAt: date,
        });
        return queryInterface.bulkInsert('users', data, {});
    },

    down: (queryInterface, Sequelize) => {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
        return queryInterface.bulkDelete('users', null, {});
    },
};
