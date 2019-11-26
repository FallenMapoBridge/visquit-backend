const db=require('../../models/index');


module.exports = function (id) {
  const isValid = 1;
  return new Promise(((resolve, reject) => {
    db.visquit.store.count({
      where: { store_id: id },
    })
      .then((count) => {
        if (count !== isValid) resolve(false);
        else resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  }));
};
