const Sequelize = require("sequelize"); //import sequelize 
const connection = require("./Database"); // connection with database 
 
// create a new table with sequelize 
const Perguntas = connection.define("perguntas",{
    titulo:{
        type: Sequelize.STRING, 
        allowNull: false,
    },
    descricao:{
        type: Sequelize.TEXT, 
        allowNull: false,
    }
});

// synchronize the table with the database 
Perguntas.sync({force: false});
module.exports = Perguntas;