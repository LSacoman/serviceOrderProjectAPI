const jwt = require('jsonwebtoken');
const { TE, to } = require('../services/util.service');
const CONFIG = require('../config/config');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	var Model = sequelize.define('ServiceOrder', {
		status: DataTypes.STRING,
		requestDate: DataTypes.STRING,
		product: DataTypes.STRING,
		problemDescription: DataTypes.STRING,
		solutionDescription: DataTypes.STRING,
		solutionPrice: DataTypes.STRING
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
        Model.belongsToMany(models.Part, {
            through: 'ServiceOrder_Part',
			allowNull: false,
			as: 'parts',
			foreignKey: 'ServiceOrderId'
		});
		Model.belongsToMany(models.Service, {
            through: 'ServiceOrder_Service',
			allowNull: false,
			as: 'services',
			foreignKey: 'ServiceOrderId'
        });
    }

	Model.prototype.toWeb = function(pw) {
		let json = this.toJSON();
		return json;
	};

	return Model;
};
