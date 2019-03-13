const { Product, User, ServiceOrder } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const models = require('../models');

// Create serviceOrder
const create = async (req, res) => {
    let err, serviceOrder;
    
	if (req.body.client != null) {
		[ err, client ] = await to(User.create(req.body.client));
		if (err) return ReE(res, err, 422);
		req.body.clientId = client.id;
	}
	if (req.body.employee != null) {
		[ err, employee ] = await to(User.create(req.body.employee));
		if (err) return ReE(res, err, 422);
		req.body.employeeId = employee.id;
	}
	if (req.body.product != null) {
		[ err, product ] = await to(Product.create(req.body.product));
		if (err) return ReE(res, err, 422);
		req.body.productId = product.id;
	}

	[ err, serviceOrder ] = await to(ServiceOrder.create(req.body));
	if (err) return ReE(res, err, 422);
	return ReS(res, { message: 'ServiceOrder criado com sucesso.', serviceOrder }, 201);
};
module.exports.create = create;

// Get one serviceOrder
module.exports.getOne = async (req, res) => {
	[ err, serviceOrder ] = await to(
		ServiceOrder.findByPk(req.params.id, {
			include: [
				{ model: User, as: 'employee' },
				{ model: User, as: 'client' },
				{ model: Product, as: 'product' }
			]
		})
	);
	if (err) return ReE(res, err, 500);
	return ReS(res, serviceOrder, 200);
};

// Get all users
module.exports.getAll = async (req, res) => {
	[ err, serviceOrder ] = await to(
		ServiceOrder.findAll({
			include: [
				{ model: User, as: 'employee' },
				{ model: User, as: 'client' },
				{ model: Product, as: 'product' }
			]
		})
	);
	if (err) return ReE(res, err, 500);
	return ReS(res, serviceOrder, 200);
};

// Update serviceOrder
module.exports.update = async (req, res) => {
	[ err, serviceOrder ] = await to(ServiceOrder.update(req.body, { where: { id: req.params.id } }));
	if (err) return ReE(res, err, 422);
	return ReS(res, { 'MSG:': 'Atualizado com Sucesso ServiceOrder de ID: ' + req.params.id }, 201);
};

// Delete serviceOrder
module.exports.del = async (req, res) => {
	[ err, serviceOrder ] = await to(ServiceOrder.destroy({ where: { id: req.params.id } }));
	if (err) return ReE(res, err, 500);
	return ReS(res, { 'MSG:': 'ServiceOrder de ID: ' + req.params.id + ' deletado!' }, 201);
};

module.exports.getOrdersFromClient = async (req, res) => {
	[ err, serviceOrder ] = await to(
		ServiceOrder.findAll({
            where: { clientId: req.params.id },
			include: [
				{ model: User, as: 'employee' },
				{ model: User, as: 'client' },
				{ model: Product, as: 'product' }
			]
		})
	);
	if (err) return ReE(res, err, 500);
	return ReS(res, serviceOrder, 200);
};

module.exports.getOrdersFromEmployee = async (req, res) => {
	[ err, serviceOrder ] = await to(
		ServiceOrder.findAll({
            where: { employeeId: req.params.id },
			include: [
				{ model: User, as: 'employee' },
				{ model: User, as: 'client' },
				{ model: Product, as: 'product' }
			]
		})
	);
	if (err) return ReE(res, err, 500);
	return ReS(res, serviceOrder, 200);
};
