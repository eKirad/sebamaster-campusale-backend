const port = process.env.PORT || 8000;
const dbURI = process.env.DB_URI || `mongodb://localhost:27017/campusaledb`;
const jwtSecret = process.env.JWT_SECRET || `very secret secret`;

module.exports = {
    developement: {
        port,
        dbURI,
        jwtSecret
    },
    production: { }
}