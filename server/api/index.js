const admin = require('./admin');
const public = require('./public');
const user = require('./user');
module.exports = (server) => {
    // server.use('/api/v1/admin', admin);
    // server.use('/api/v1/public', public);
    server.use('/api/v1/user', user);
};
