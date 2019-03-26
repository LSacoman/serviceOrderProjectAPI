const { Service } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const models = require('../models');

// Create service
const create = async (req, res) => {
	let err, service;
	[ err, service ] = await to(Service.create(req.body));
	if (err) return ReE(res, err, 422);
	return ReS(res, { message: 'Service criado com sucesso.', service }, 201);
};
module.exports.create = create;

// Get one service
module.exports.getOne = async (req, res) => {
	[ err, service ] = await to(Service.findByPk(req.params.id));
	if (err) return ReE(res, err, 500);
	return ReS(res, service, 200);
};

// Get all users
module.exports.getAll = async (req, res) => {
	[ err, service ] = await to(Service.findAll());
	if (err) return ReE(res, err, 500);
	return ReS(res, service, 200);
};

// Update service
module.exports.update = async (req, res) => {
	[ err, service ] = await to(Service.update(req.body, { where: { id: req.params.id } }));
	if (err) return ReE(res, err, 422);
	return ReS(res, { 'MSG:': 'Atualizado com Sucesso Service de ID: ' + req.params.id }, 201);
};

// Delete service
module.exports.del = async (req, res) => {
	[ err, service ] = await to(Service.destroy({ where: { id: req.params.id } }));
	if (err) return ReE(res, err, 500);
	return ReS(res, { 'MSG:': 'Service de ID: ' + req.params.id + ' deletado!' }, 201);
};
