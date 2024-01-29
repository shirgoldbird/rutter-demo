let { postGeneric } = require('./Generic.js');

module.exports = {
    createBill: async function() {
        return await postGeneric('accounting/bills', {})
    }
}