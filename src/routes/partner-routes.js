const partnerController = require('../controllers/partner-controller');
const middleware = require('../middlewares/middleware');

module.exports = (app, api) => {
    // Creates a partner with a `isApproved` flag set to false
    app.post(`${api}/become-partner`, partnerController.createPartner);
    
    // Update/approve a specific partner
    app.put(`${api}/partner`, 
        middleware.checkAuthentication,
        middleware.checkAdminRole,    
        partnerController.updatePartner);
    
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
