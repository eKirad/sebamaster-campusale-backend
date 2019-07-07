const partnerController = require('../controllers/partner-controller');

module.exports = (app, api) => {
    app.get(`${api}/partners`, partnerController.getAllPartners);
}
