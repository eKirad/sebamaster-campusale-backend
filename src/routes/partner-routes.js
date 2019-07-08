const partnerController = require('../controllers/partner-controller');
const middleware = require('../middlewares/middleware');

module.exports = (app, api) => {
    app.get(`${api}/partners`, 
        middleware.checkAuthentication,
        middleware.checkAdminRole,
        partnerController.getAllPartners);
    app.get(`${api}/approved-partners`, partnerController.getApprovedPartners);
}
