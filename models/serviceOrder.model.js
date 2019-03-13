const jwt = require('jsonwebtoken');
const { TE, to } = require('../services/util.service');
const CONFIG = require('../config/config');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	var Model = sequelize.define('ServiceOrder', {
		status: DataTypes.STRING,
		requestDate: DataTypes.STRING,
		problemDescription: DataTypes.STRING,
		solutionDescription: DataTypes.STRING,
		solutionPrice: DataTypes.BOOLEAN
    });
    
    Model.associate = function(models) {
        Model.belongsTo(models.User, {
            foreignKey: 'employeeId',
			allowNull: false,
			as: 'employee'
        });
        Model.belongsTo(models.User, {
            foreignKey: 'clientId',
			allowNull: false,
			as: 'client'
        });
        Model.belongsTo(models.Product, {
            foreignKey: 'productId',
			allowNull: false,
			as: 'product'
        })
    }

	Model.prototype.toWeb = function(pw) {
		let json = this.toJSON();
		return json;
	};

	return Model;
};
