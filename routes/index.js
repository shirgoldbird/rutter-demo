let express = require('express');
let router = express.Router();
let { getAccounts } = require("../rutter/Accounts.js");
let { getVendors } = require("../rutter/Vendors.js");

/* GET home page. */
router.get('/', async (req, res, next) => {
    const accountData = await getAccounts();
    const vendorData = await getVendors();

    res.render('index', { 
      accounts: accountData.accounts,
      vendors: vendorData.vendors
    });
});

module.exports = router;
