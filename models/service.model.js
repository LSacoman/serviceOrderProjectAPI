module.exports = (sequelize, DataTypes) => {
	var Model = sequelize.define('Service', {
		type: DataTypes.STRING,
		description: DataTypes.STRING
	});

	Model.prototype.toWeb = function(pw) {
		let json = this.toJSON();
		return json;
	};

	return Model;
};
