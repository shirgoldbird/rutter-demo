let express = require('express');
let router = express.Router();
let { getAccounts, getAccount } = require("../rutter/Accounts.js");
let { getVendors } = require("../rutter/Vendors.js");

/* GET home page. */
router.get('/', async (req, res, next) => {
  const accountData = await getAccounts();
  const vendorData = await getVendors();
  const accountsPayableAccount = await getAccount('Accounts Payable (A/P)');

  res.render('index', { 
    accounts: accountData.accounts,
    accountsPayableAccount: accountsPayableAccount,
    vendors: vendorData.vendors
  });
});

module.exports = router;
