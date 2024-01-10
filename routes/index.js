var express = require('express');
var router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
var getAccounts = require("../rutter/Accounts.js");

/* GET home page. */
router.get('/', async (req, res, next) => {
    const data = await getAccounts();
    console.log(data)

    res.render('index', { 
      data: data.accounts
    });
});

module.exports = router;
