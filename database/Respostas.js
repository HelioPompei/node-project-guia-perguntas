const Sequelize = require("sequelize"); //import sequelize 
const connection = require("./Database"); // connection with database 
 
// create a new table with sequelize 
const Respostas = connection.define("respostas",{
    corpo:{
        type: Sequelize.TEXT, 
        allowNull: false,
    },
    perguntaID:{
        type: Sequelize.INTEGER, 
        allowNull: false,
    }
});

// synchronize the table with the database 
Respostas.sync({force: false});
module.exports = Respostas;