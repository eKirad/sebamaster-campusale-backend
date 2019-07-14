const port = process.env.PORT;
const dbURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds054298.mlab.com:54298/campusale`;
const jwtSecret = process.env.JWT_SECRET || `very secret secret`;

module.exports = {
    developement: {
        port,
        dbURI,
        jwtSecret
    },
    production: { }
}