const jwt = require('jsonwebtoken');
const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource.initialize();

const validateTokenForView = (req, res, next) => {
  // 인증 완료
  try {
    const token = req.headers.token;

    // 토큰이 없는 비로그인 유저
    if (token) {
      const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
      const user_id = verifiedToken.id;

      req.user_id = user_id;
    } else if (!token) {
      next();
    }

    next();
  } catch (err) {
    if (error.name === 'TokenExpiredError') {
      res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.',
      });
    }
    // 토큰의 비밀키가 일치하지 않는 경우
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({
        code: 401,
        message: '유효하지 않은 토큰입니다.',
      });
    }
  }
};

module.exports = {
  validateTokenForView,
};
