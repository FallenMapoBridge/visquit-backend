const baseResult=require('../common/baseResult');
const httpcode=require('../common/http_status_enum');

module.exports = function (res) {
  const BaseResult=new baseResult();
  BaseResult.status='INVALID ID';
  BaseResult.results=[];
  res.status(httpcode.HTTP_UNAUTHORIZED)
    .json(BaseResult);
};
