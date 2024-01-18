let { getGeneric } = require('./Generic.js');

module.exports = {
    getItems: async function() {
        let items = await getGeneric('accounting/items')
        return items;
    }
}