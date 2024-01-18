let { getGeneric } = require('./Generic.js');

module.exports = {
    getAccounts: async function() {
        return await getGeneric('accounting/accounts')
    },

    getAccount: async function(accountName) {
        let accountsObj = await module.exports.getAccounts();
        let account = accountsObj.accounts.filter((account) => account.name == accountName)[0];
        return account;
    }
}