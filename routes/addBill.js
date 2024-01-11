let express = require('express');
let router = express.Router();
let { getVendors } = require("../rutter/Vendors.js");

router.get('/', async (req, res, next) => {
    const vendorData = await getVendors();

    res.render('add_bill', { 
      vendors: vendorData.vendors
    });
});

module.exports = router;
