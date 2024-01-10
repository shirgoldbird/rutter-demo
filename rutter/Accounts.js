module.exports = function () {
    var authString = Buffer.from(`${process.env.RUTTER_CLIENT_ID}:${process.env.RUTTER_CLIENT_SECRET}`).toString('base64');

    var myHeaders = new Headers();
    myHeaders.append("x-rutter-version", process.env.RUTTER_API_VERSION);
    myHeaders.append("Authorization", `Basic ${authString}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`https://sandbox.rutterapi.com/versioned/accounting/accounts?access_token=${process.env.RUTTER_QUICKBOOKS_ACCESS_TOKEN}`, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error));
}