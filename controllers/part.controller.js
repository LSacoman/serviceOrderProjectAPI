const { Part } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const models = require('../models');

// Create part
const create = async (req, res) => {
	let err, part;
	[ err, part ] = await to(Part.create(req.body));
	if (err) return ReE(res, err, 422);
	return ReS(res, { message: 'Part criado com sucesso.', part }, 201);
};
module.exports.create = create;

// Get one part
module.exports.getOne = async (req, res) => {
	[ err, part ] = await to(Part.findByPk(req.params.id));
	if (err) return ReE(res, err, 500);
	return ReS(res, part, 200);
};

// Get all users
module.exports.getAll = async (req, res) => {
	[ err, part ] = await to(Part.findAll());
	if (err) return ReE(res, err, 500);
	return ReS(res, part, 200);
};

// Update part
module.exports.update = async (req, res) => {
	[ err, part ] = await to(Part.update(req.body, { where: { id: req.params.id } }));
	if (err) return ReE(res, err, 422);
	return ReS(res, { 'MSG:': 'Atualizado com Sucesso Part de ID: ' + req.params.id }, 201);
};

// Delete part
module.exports.del = async (req, res) => {
	[ err, part ] = await to(Part.destroy({ where: { id: req.params.id } }));
	if (err) return ReE(res, err, 500);
	return ReS(res, { 'MSG:': 'Part de ID: ' + req.params.id + ' deletado!' }, 201);
};
