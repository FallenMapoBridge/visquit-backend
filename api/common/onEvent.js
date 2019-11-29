const baseResult=require('../common/baseResult');
const httpcode=require('../common/http_status_enum');

function onInValidStoreId(res) {

  /* ************************** */
  /* reject invalid api request */
  /* ************************** */

  const BaseResult=new baseResult();
  BaseResult.status='INVALID ID';
  BaseResult.results=[];
  res.status(httpcode.HTTP_UNAUTHORIZED)
    .json(BaseResult);
};

function onSQLQueryError(res) {

  /* ************************** */
  /* handle error on Sql query */
  /* ************************** */

  const BaseResult=new baseResult();
  BaseResult.status='INTERNAL SEVER ERROR';
  // BaseResult.message=
  BaseResult.results=[];
  res.status(httpcode.HTTP_INTERNAL_SERVER_ERROR)
    .json(BaseResult);
};

module.exports.onSQLQueryError=onSQLQueryError;
module.exports.onInValidStoreId=onInValidStoreId;