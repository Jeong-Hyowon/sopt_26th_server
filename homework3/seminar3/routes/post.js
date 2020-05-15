var express = require('express');
var router = express.Router();
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
let Post = require('../models/post');
var moment = require('moment');

//게시글 작성
router.post('/', async (req, res) => {
    const {
        title,
        content,
        nickname,
    } = req.body;
    var date=new Date();
    // request data 확인 - 없다면 Bad Request 반환
    if (!title || !content || !nickname) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }
    let time=moment(date).format('YYYY-MM-DD HH:mm:ss');
    let pid=Post.length-1;
    let id=Post[pid].id+1;
    Post.push({
        id,
        title,
        content,
        nickname,
        time
    });
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.POSTING_SUCCESS, {postId: id, postTitle: title, postContent: content, postNickname: nickname, postDate: time}));
});

//게시글 아이디로 조회
router.get('/:id', async(req,res)=>{
    const id=req.params.id;
    const post=Post.filter(post => post.id == id)
    // request data 확인 - 없다면 Bad Request 반환
    if (!id) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }

    //None post
    if (post.length == 0) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.READ_POST_FAIL));
        return;
    }

    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, {postId: post[0].id, postTitle: post[0].title, postContent: post[0].content, postNickname: post[0].nickname, postTime: post[0].time}));
    
})

//게시글 수정
router.put('/:id', async(req, res)=>{
    const id=req.params.id;
    const { title, content, nickname} = req.body;
    date=new Date();
    time=moment(date).format('YYYY-MM-DD HH:mm:ss');
    const post = Post.filter(post => post.id == id)[0];
    if (!id || !content) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }

    if (id==post.id){
        post.content=content;
        post.time=time;
        res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.POSTING_UPDATE_SUCCESS, {postId: post.id, postTitle: post.title, postContent: post.content, postNickname: post.nickname, postTime: post.time}))
    }

    else {res.status(statusCode.BAD_REQUEST).send(util.success(statusCode.BAD_REQUEST, resMessage.POSTING_UPDATE_FAIL))}
})

//게시글 삭제
router.delete('/:id', async(req, res)=>{
    const id=req.params.id;
    const post = Post.filter(post => post.id == id)[0];
    if (!id) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }

    if (id==post.id){
        Post.splice(id,1);
        res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.POSTING_DELETE_SUCCESS, {deleteId:id}));
        return true;
    }

    else{res.status(statusCode.BAD_REQUEST).send(util.success(statusCode.BAD_REQUEST, resMessage.POSTING_DELETE_FAIL))}
})

//게시글 전체보기
router.get('/', async(req, res)=>{
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, Post));
});

module.exports = router;