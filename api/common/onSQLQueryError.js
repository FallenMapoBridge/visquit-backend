const baseResult=require('./baseResult');
const httpcode=require('./http_status_enum');

module.exports = function (res) {
  const BaseResult=new baseResult();
  BaseResult.status='INTERNAL SEVER ERROR';
  // BaseResult.message=
  BaseResult.results=[];
  res.status(httpcode.HTTP_INTERNAL_SERVER_ERROR)
    .json(BaseResult);
};
