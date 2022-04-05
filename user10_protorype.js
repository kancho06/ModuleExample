function User(id, name) {
    this.id = id;
    this.name = name;
}

User.prototype.getUser = function() {
    return {id : this.id, name: this.name};
};

User.prototype.group = {id: 'group01', name: 'friend'}

User.prototype.printUser = function() {
    console.log('user 이름 : ' + this.name + ', group : ' + this.group);
};


// User를 그대로 리턴
module.exports = User;