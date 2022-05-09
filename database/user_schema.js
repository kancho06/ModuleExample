import crypto from "crypto";


const Schema = {};

Schema.createSchema = function (mongoose) {
    console.log("createSchema 호출됨.")

    const UserSchema = mongoose.Schema({
        id: {type: String, required: true, unique: true, 'default': ''},
        hashed_password: {type: String, required: true, 'default': ''},
        salt: {type: String, required: true},
        name: {type: String, index: 'hashed', 'default': ''},
        age: {type: Number, 'default': -1},
        created: {type: Date, index: {unique: false}, 'default': Date.now()},
        updated: {type: Date, index: {unique: false}, 'default': Date.now()}
    });
    console.log('UserSchema 정의됨');

    UserSchema
        .virtual('password')
        .set(function (password) {
            this.salt = this.makeSalt();
            this.hashed_password = this.encryptPassword(password);
            console.log('virtual password 저장됨 : ' + this.hashed_password);

        });

// salt 값을 이용해서 비밀번호를 encoding(암호화) 한다.
// plainText는 유저가 지금 입력한 password이다
    UserSchema.method('encryptPassword', function (plainText, inSalt) {
        if (inSalt) {
            return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
        } else {
            return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
        }
    });

// 매번 같은 salt로 encoding 을 해주면 보안의 문제가 있기때문에
// salt값을 매번 랜덤으로 생성해 준다.
    UserSchema.method('makeSalt', function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    });

// 비밀번호 대조
    UserSchema.method('authenticate', function (plainText, inSalt, hashed_password) {
        if (inSalt) {
            console.log('authenticate 호출됨');
            return this.encryptPassword(plainText, inSalt) === hashed_password;
        } else {
            console.log('authenticate 호출됨');
            return this.encryptPassword(plainText) === hashed_password;
        }
    });

// jpa에서 findByIdAndUserNickName과 같은 함수 비슷하게 쓰는 함수를 설정
    UserSchema.static('findById', function (id, callback) {
        return this.find({id: id}, callback);
    });

    UserSchema.static('findAll', function (callback) {
        return this.find({}, callback);
    });

    return UserSchema;
}

module.exports = Schema;