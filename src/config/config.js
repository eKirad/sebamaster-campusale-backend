const port = process.env.PORT || 8000;
const dbURI = process.env.DB_URI || `mongodb://localhost:27017/campusaledb`;

module.exports = {
    developement: {
        port,
        dbURI
    },
    production: { }
}