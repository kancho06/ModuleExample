var require = function(path) {
    const exports = {};
    exports.getUser =function() {
            return {id : 'test01', name : 'aespa'};
        },
    exports.group = {id : 'group01', name : 'friend'};
    
    return exports;
}


const user = require('...');

function showUser() {
    return user.getUser().name + ', ' + user.group.name;
}

console.log('사용자 정보 : ' + showUser());