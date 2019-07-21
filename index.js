const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const env = process.env.NODE_ENV || `developement`;

const apiVersion = `v1`;
const api = `/api/${apiVersion}`;

// Set the corresponding properties to the config object
const config = require('./src/config/config')[env]
// Configure the database with config data
require('./src/config/database') (config);

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Call category routes
require('./src/routes/category-routes') (app, api);
// Call item routes
require('./src/routes/item-routes') (app, api);
// Call partner routes
require('./src/routes/partner-routes') (app, api);
// Call user routes
require('./src/routes/user-routes') (app, api);
// Call wishlist routes
require('./src/routes/wishlist-routes') (app, api);
// Call discount routes
require('./src/routes/discount-routes') (app, api);
// Call post routes
require('./src/routes/post-routes') (app, api);

app.listen(config.port, () => console.log(`Listening on port ${config.port}...`));

