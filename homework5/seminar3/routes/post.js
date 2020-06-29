var express = require('express');
var router = express.Router();
const postControllers = require('../controllers/postController');
const middlewares = require('../modules/middlewares').userJwt;
//게시글 작성_jwt확인
router.post('/', middlewares, postControllers.writePost);

//게시글 아이디로 조회
router.get('/:id', postControllers.readPostOne);

//게시글 수정_jwt확인
router.put('/:id', middlewares, postControllers.updatePost);

//게시글 삭제_jwt확인
router.delete('/:id', middlewares, postControllers.deletePost);

//게시글 전체보기
router.get('/', postControllers.readPostAll);

module.exports = router;