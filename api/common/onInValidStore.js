const baseResult=require('../common/baseResult');
const httpcode=require('../common/http_status_enum');

module.exports = function (res) {
  const baseResult=new baseResult();
  baseResult.status='INVALID ID';
  baseResult.results=[];
  res.status(httpcode.HTTP_UNAUTHORIZED)
    .json(baseResult);
};
