let express = require('express');
let router = express.Router();
let { getVendors } = require("../rutter/Vendors.js");
let { getItems } = require("../rutter/Items.js");

router.get('/', async (_req, res) => {
    const vendorData = await getVendors();
    const itemData = await getItems();
    const filteredItems = itemData.items.filter((item) => item.type == 'inventory');

    res.render('add_bill', { 
      vendors: vendorData.vendors,
      items: filteredItems
    });
});

router.post('/', function (req) {
  console.log(req.body);
})

module.exports = router;
