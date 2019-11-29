const httpcode=require('../common/http_status_enum');

class BaseResult {
  constructor() {
    this.results = [];
    this.status = 'NULL';
    this.message = '';
  }
}

module.exports = BaseResult;

