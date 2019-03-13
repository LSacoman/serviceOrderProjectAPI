const { Product } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const models = require('../models');

// Create product
const create = async (req, res) => {
	let err, product;
	[ err, product ] = await to(Product.create(req.body));
	if (err) return ReE(res, err, 422);
	return ReS(res, { message: 'Product criado com sucesso.', product }, 201);
};
module.exports.create = create;

// Get one product
module.exports.getOne = async (req, res) => {
	[ err, product ] = await to(Product.findByPk(req.params.id));
	if (err) return ReE(res, err, 500);
	return ReS(res, product, 200);
};

// Get all users
module.exports.getAll = async (req, res) => {
	[ err, product ] = await to(Product.findAll());
	if (err) return ReE(res, err, 500);
	return ReS(res, product, 200);
};

// Update product
module.exports.update = async (req, res) => {
	[ err, product ] = await to(Product.update(req.body, { where: { id: req.params.id } }));
	if (err) return ReE(res, err, 422);
	return ReS(res, { 'MSG:': 'Atualizado com Sucesso Product de ID: ' + req.params.id }, 201);
};

// Delete product
module.exports.del = async (req, res) => {
	[ err, product ] = await to(Product.destroy({ where: { id: req.params.id } }));
	if (err) return ReE(res, err, 500);
	return ReS(res, { 'MSG:': 'Product de ID: ' + req.params.id + ' deletado!' }, 201);
};
