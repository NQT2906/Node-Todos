var configValues = require('./config.json');

module.exports = {
    getDbConnectionString: function() {
        return `mongodb+srv://ThuanNQ:${configValues.password}@nodetodos.ghhk1.mongodb.net/test`;
    }
};
