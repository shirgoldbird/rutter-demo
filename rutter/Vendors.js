let { getGeneric } = require('./Generic.js');

module.exports = {
    getVendors: async function () {
        return await getGeneric('accounting/vendors')
    }
}