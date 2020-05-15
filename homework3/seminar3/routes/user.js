var express = require('express');
var router = express.Router();
let User = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
const crypto = require('crypto');

//회원가입
router.post('/signup', async (req, res) => {
    const {
        id,
        name,
        password,
        email
    } = req.body;
    // request data 확인 - 없다면 Bad Request 반환
    if (!id || !name || !password || !email) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    //already ID
    if (User.filter(user => user.id == id).length > 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
        return;
    }

    const salt = crypto.randomBytes(32).toString('hex');
    const hashed = crypto.pbkdf2Sync(password, salt.toString(), 100000, 32, 'sha512').toString('hex');
    User.push({
        id,
        name,
        'password':hashed,
        salt,
        email
    });
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.CREATED_USER, {userId: id, userPassword: hashed, saltPw: salt}));
});

//로그인
router.post('/signin', async (req, res) => {
    // request body 에서 데이터 가져오기
    const {
        id,
        password
    } = req.body;
    // request data 확인 - 없다면 Null Value 반환
    if (!id || !password) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    const user = User.filter(user => user.id == id);
    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    if (user.length == 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }

    const salt = crypto.randomBytes(32).toString('hex');
    const hashed = crypto.pbkdf2Sync(password, user[0].salt.toString(), 100000, 32, 'sha512').toString('hex');
    
    // 비밀번호 확인 - 없다면 Miss match password 반환
    if (user[0].password !== hashed ) {
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
        return;
    }
    // 성공 - login success와 함께 user Id 반환
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {userId: id, userPw1:user[0].password, userPw2:hashed}));
});

//프로필조회
router.get('/profile/:id', async (req, res) => {
    // request params 에서 데이터 가져오기
    const id = req.params.id;
    const user = User.filter(user => user.id == id)[0];
    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    if (user === undefined) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }
    const dto = {
        id: user.id,
        name: user.name,
        email: user.email
    }
    // 성공 - login success와 함께 user Id 반환
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, dto));
});

//전체 회원 조회
router.get('/', async(req, res)=>{
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.READ_USER_SUCCESS, User));
});

module.exports = router;