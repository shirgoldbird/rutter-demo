module.exports = {
    generic: async function(method, path, data, cursor) {
        let authString = Buffer.from(`${process.env.RUTTER_CLIENT_ID}:${process.env.RUTTER_CLIENT_SECRET}`).toString('base64');

        let headers = new Headers({
            'x-rutter-version': process.env.RUTTER_API_VERSION,
            'Authorization': `Basic ${authString}`
        });

        let requestOptions = {
            method: method,
            headers: headers,
            redirect: 'follow'
        };

        url = `https://sandbox.rutterapi.com/versioned/${path}?access_token=${process.env.RUTTER_QUICKBOOKS_ACCESS_TOKEN}`;

        if (cursor) url += `&cursor=${cursor}`;

        let response = await fetch(url, requestOptions);
        
        if (!response.ok) { 
            console.error(response); 
            return Promise.reject(response); 
        }

        let result = await response.json();

        /* Iterate through next pages of results, if applicable */
        if (!result.next_cursor) {
            return result;
        } else {
            let object = path.split('/').slice(-1)[0]
            result[object].push(...(await module.exports.generic(method, path, data, result.next_cursor))[object]);
            return result;
        }
    },

    getGeneric: async function(path) {
        const method = 'GET';

        try {
            let result = await module.exports.generic(method, path);
            return result;
        } catch (error) {
            console.error(`Error getting ${path}: ${error}`)
            Promise.reject(`Error getting ${path}: ${error}`);
        }
    },

    postGeneric: async function(path, data) {
        const method = 'POST';

        try {
            let result = await module.exports.generic(method, path, data);
            return result;
        } catch {
            console.error(`Error getting ${path}: ${error}`)
            Promise.reject(`Error getting ${path}: ${error}`);
        }
    }
}