const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item-controller');
const middleware = require('../middlewares/middleware');

var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })

module.exports = (app, api) => {
    app.get(`${api}/items`, itemController.getAllItems);
    
    app.get(`${api}/items/:id`, itemController.getItem);

    app.get(`${api}/items/image/:filename`, itemController.getItemImage);

    app.get(`${api}/partner-items`, 
        middleware.checkAuthentication,
        middleware.isAdminOrPartner,
        itemController.getPartnerItems);

    app.post(`${api}/items`, 
        middleware.checkAuthentication, 
        middleware.isAdminOrPartner,
        upload.single('image'),
        itemController.addItem);
    
    // Currently unused
    app.put(`${api}/items`, 
        middleware.checkAuthentication,
        middleware.isAdminOrPartner,
        itemController.updateItem);
}
