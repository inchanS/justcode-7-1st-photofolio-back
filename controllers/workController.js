const workService = require('../services/workService');

// 카테고리별 총 게시물 수 + 최신 feed list
const worksList = async (req, res) => {
  try {
    const result = await workService.worksList();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 지정된 피드 상세
const feed = async (req, res) => {
  try {
    const { id } = req.params;
    user_id = req.user_id;
    const result = await workService.feed(id, user_id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

// 팔로우 체결
const following = async (req, res) => {
  try {
    const { following_id } = req.body;
    user_id = req.user_id;
    const result = await workService.following(following_id, user_id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

//팔로우 취소
const followingCancel = async (req, res) => {
  try {
    const { following_id } = req.body;
    user_id = req.user_id;
    const result = await workService.followingCancel(following_id, user_id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { worksList, feed, following, followingCancel };
