let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
let Post = require('../models/post');
module.exports ={
    //게시글 작성
    writePost: async (req, res) => {
        const {
            title,
            content,
        } = req.body;
        const authorIdx = req.userIdx;
        console.log(authorIdx);
        // request data 확인 - 없다면 Bad Request 반환
        if (!title || !content || !authorIdx) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        const idx = await Post.postWrite(authorIdx,title, content);
        if (idx === -1) {
            return res.status(statusCode.DB_ERROR)
                .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        //성공하면
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.POSTING_SUCCESS, {postId: idx}));
    },

    //게시글 아이디로 조회
    readPostOne: async(req,res)=>{
        const id=req.params.id;
        const idx = await Post.checkPost(id);
        const idx1 = await Post.getPostById(id);
        //None post
        if (idx === false) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.READ_POST_FAIL));
            return;
        }
        //성공하면
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, {postId: idx1}));
        
    },

    //게시글 수정
    updatePost: async(req, res)=>{
        const id=req.params.id;
        const {content} = req.body;
        const idx = await Post.postUpdate(id,content);
        const idx1 = await Post.checkPost(id);
        if (idx === false) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        //게시글 존재하지 않으면
        if (idx1 === false){
            res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.READ_POST_FAIL));
        return;
        }
        //성공하면
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.POSTING_UPDATE_SUCCESS, {postId: idx}));

    },

    //게시글 삭제
    deletePost: async(req, res)=>{
        const id=req.params.id;
        const idx = await Post.postDelete(id);
        if (idx === false) {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
            return;
        }
        //성공하면
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.POSTING_DELETE_SUCCESS, {deleteId:idx}));

    },

    //게시글 전체보기
    readPostAll: async(req, res)=>{
        const idx = await Post.getPostAll();
        return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, idx));
    }
}