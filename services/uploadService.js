const uploadDao = require('../models/uploadDao');


const uploadImages = async (title, content, arrayTag, image, category_name, user_id, public_status) => {
  console.log('서비스1')
  const path = image.map(img => img.location);
  if (image === undefined) {
    throw new Error("이미지가 존재하지 않습니다")
  }

  if (!title) {
    throw new Error("제목을 입력해주세요")
  }

  if (arrayTag.length > 10) {
    throw new Error("태그는 10개까지만 할 수 있어요.")
  }
  const category_id = await uploadDao.worksCategory(category_name);
  console.log('서비스2')
  const status_id = await uploadDao.publicStatus(public_status);
  console.log('서비스3')
  const tilteName = await uploadDao.findTilte(title, user_id);
  console.log('서비스4')
  if (tilteName.length !==0 ) {
    throw new Error('같은 제목이 이미 존재합니다.');
  }
  await uploadDao.uploadForm(title, content, user_id, category_id, status_id);
  console.log('서비스5')
  const posting_id = await uploadDao.worksPosting(user_id, title);
  console.log('서비스6')
  await uploadDao.uploadImages(posting_id, path);
  console.log('서비스7')
  await uploadDao.worksTagNames(arrayTag);
  console.log('서비스8')
  await uploadDao.deleteOverlapTag();
  console.log('서비스9')
  await uploadDao.findTagId(arrayTag);
  console.log('서비스10')
}

const uploadTest = async (image) => {
  const path1 = image.map(img => img.location);
  if (image === undefined) {
    return res.status(400).send(util.fail(400, "이미지가 존재하지 않습니다"))
  }
  await uploadDao.uploadImages(path1)
}



module.exports = { uploadImages, uploadTest }
