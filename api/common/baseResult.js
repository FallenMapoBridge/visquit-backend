const httpcode=require('../common/http_status_enum');

class BaseResult {
  constructor() {
    this.results = [];
    this.status = 'OK';
    this.message = '';
  }
}

module.exports = BaseResult;

