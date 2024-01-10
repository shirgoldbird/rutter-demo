var express = require('express');
var router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

/* GET home page. */
router.get('/', async (req, res, next) => {
  console.log(process.env)
  const response = await fetch(
    'https://api.thecatapi.com/v1/images/search?limit=1', {
      headers: {
        'x-api-key': process.env.CAT_API_KEY
      }
    });
    const data = await response.json();

    console.log(data)

    res.render('index', { 
      title: 'Express', 
      data: JSON.stringify(data),
      imgUrl: data[0].url
    });
});

module.exports = router;
