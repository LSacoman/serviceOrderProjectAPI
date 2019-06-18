require("dotenv").config();
let CONFIG = {};

CONFIG.app = process.env.APP || "dev"; // ambiente em que a api esta sendo utilizada -> dev ou production
CONFIG.port = process.env.PORT || "4000"; // porta em que a API sera disponibilizada

CONFIG.db_dialect = process.env.DB_DIALECT || "mysql"; // mysql ou mariadb
CONFIG.db_host = "localhost"; // ip do servidor da base de dados
CONFIG.db_port = "3306"; // porta do servidor da base de dados
CONFIG.db_name = "maintenceapp"; // nome da base de dados
CONFIG.db_user = "root"; // usuario para acessar a base de dados
CONFIG.db_password = ""; // senha para acessar a base de dados

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || "jwt_please_change"; // chave usada para criptografar as senhas
CONFIG.jwt_salt = process.env.JWT_SALT || 10;
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || "2592000"; // tempo para expirar o token em segundos

module.exports = CONFIG;