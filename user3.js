const user = {
    getUser: function() {
        return {id : 'test01', name: 'aespa'};
    },
    group: {id:'group01',name:'aespa'}
};

// 바로 exports에 객체 할당가능
module.exports = user;