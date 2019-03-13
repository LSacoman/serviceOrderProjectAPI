module.exports = (sequelize, DataTypes) => {
	var Model = sequelize.define('Product', {
		model: DataTypes.STRING,
		brand: DataTypes.STRING,
		description: DataTypes.STRING
	});

	Model.prototype.toWeb = function(pw) {
		let json = this.toJSON();
		return json;
	};

	return Model;
};
