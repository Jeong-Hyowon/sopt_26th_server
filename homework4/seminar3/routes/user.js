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
    const idx1 = await User.checkUser(id);
    if (idx1===true) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
        return;
    }

    const salt = crypto.randomBytes(32).toString('hex');
   
    const idx = await User.signup(id, name, password, salt, email);
    if (idx === -1) {
        return res.status(statusCode.DB_ERROR)
            .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.CREATED_USER, {userId: idx}));
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

    const idx1 = await User.checkUser(id);
    // // 존재하는 아이디인지 확인 - 없다면 No user 반환
    if (idx1===false) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }

    const idx = await User.signin(id, password);
    if (idx === false) {
        //비밀번호 틀리면
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
            return;
    }

    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {userId: idx}));
});

//프로필조회
router.get('/profile/:id', async (req, res) => {
    // request params 에서 데이터 가져오기
    const id = req.params.id;
    const idx1 = await User.checkUser(id);
    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    if (idx1===false) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }
    // 성공 - login success와 함께 user Id 반환
    const idx = await User.getUserById(id);
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, {userId:idx.id, userName:idx.name, userEmail:idx.email}));
});

//전체 회원 조회
router.get('/', async(req, res)=>{
    const idx = await User.getUserAll();
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.READ_USER_SUCCESS, idx));
});

module.exports = router;