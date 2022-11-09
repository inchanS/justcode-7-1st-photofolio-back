const express = require('express');
const router = express.Router();

// 토큰이 필요할시,
const { validateToken } = require('../middlewares/validateToken');
const workController = require('../controllers/workController');
const { validateTokenForView } = require('../middlewares/validateTokenForView');

// 카테고리별 총 게시물 수 + 최신 feed list
router.get('/list/', workController.worksList);
router.get('/list/:sort', workController.worksList); // sort 종류 ('recommendpoint', 'sympathycnt')
router.get('/:id', workController.feed); // 토큰여부 필요함
router.post('/following', validateToken, workController.following); //토큰 필요!!
router.delete(
  '/following-cancel',
  validateToken,
  workController.followingCancel
); //토큰 필요!!
router.post('/sympathy', validateToken, workController.sympathy); // 공감
router.delete('/sympathy', validateToken, workController.sympathyCancel); // 공감취소

module.exports = router;
