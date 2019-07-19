const partnerController = require('../controllers/partner-controller');
const middleware = require('../middlewares/middleware');

module.exports = (app, api) => {
    app.get(`${api}/partners`, 
        middleware.checkAuthentication,
        middleware.isAdmin,
        partnerController.getAllPartners);
        
    app.get(`${api}/approved-partners`, partnerController.getApprovedPartners);
    
    app.post(`${api}/partners`, partnerController.createPartner);
    
    app.put(`${api}/partners/:id`, 
        middleware.checkAuthentication,
        middleware.isAdmin,    
        partnerController.updatePartner);

    // Currently unused    
    app.delete(`${api}/partners/:id`,
        middleware.checkAuthentication,
        middleware.isAdmin,
        partnerController.deletePartner);
}
