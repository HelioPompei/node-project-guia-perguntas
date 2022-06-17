const Sequelize = require("sequelize"); // import sequelize 

// connection with database 
const connection = new Sequelize("guiaperguntas","root","mysql",{
    host: "localhost",
    dialect: "mysql" 
});

//exporting the connection to the database 
module.exports = connection;