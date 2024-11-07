const http = require('http');
const context = {
    isLoggedIn: http.header,
    anything: 5,
    test(){
        return true;
    }
};

module.exports = context;