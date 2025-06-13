const moment = require('moment');
let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf() //using moment.js to get the current time in milliseconds
    };
};

let generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    };
}

module.exports = {generateMessage , generateLocationMessage}; 