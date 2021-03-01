const axios = require('axios');

(async () => {
    try {
        const data = await axios.get('http://localhost:5000/details');
        console.log(data.data);
    } catch (e) {
        console.error(e);
    }
})()