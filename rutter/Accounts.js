module.exports = {
    getAccounts: async function(cursor) {
        let authString = Buffer.from(`${process.env.RUTTER_CLIENT_ID}:${process.env.RUTTER_CLIENT_SECRET}`).toString('base64');

        let headers = new Headers({
            'x-rutter-version': process.env.RUTTER_API_VERSION,
            'Authorization': `Basic ${authString}`
        });

        let requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        url = `https://sandbox.rutterapi.com/versioned/accounting/accounts?access_token=${process.env.RUTTER_QUICKBOOKS_ACCESS_TOKEN}`;

        if (cursor) url += `&cursor=${cursor}`;

        let response = await fetch(url, requestOptions);
        
        if (!response.ok) { return Promise.reject(response); }

        let result = await response.json();

        if (!result.next_cursor) {
            return result
        } else {
            result.accounts.push(...(await module.exports.getAccounts(result.next_cursor)).accounts)
            return result
        }
    }
}