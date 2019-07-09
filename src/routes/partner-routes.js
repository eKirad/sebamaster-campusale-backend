const partnerController = require('../controllers/partner-controller');
const middleware = require('../middlewares/middleware');

module.exports = (app, api) => {
    app.post(`${api}/become-partner`, partnerController.createPartner);
    
    // Needs authorization middleware, only admin should be able to update partner
    app.put(`${api}/partner`, partnerController.updatePartner);
    
    app.get(`${api}/partners`, 
        middleware.checkAuthentication,
        middleware.checkAdminRole,
        partnerController.getAllPartners);
    app.get(`${api}/approved-partners`, partnerController.getApprovedPartners);
    app.delete(`${api}/partner/:id`,
        middleware.checkAuthentication,
        middleware.checkAdminRole,
        partnerController.deletePartner
    )
}
