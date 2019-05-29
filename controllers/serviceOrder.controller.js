const { Part, User, ServiceOrder, Service } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const models = require('../models');

// Create serviceOrder
const create = async (req, res) => {
	let err, serviceOrder, parts, services;

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

	[ err, serviceOrder ] = await to(ServiceOrder.create(req.body));
	if (err) return ReE(res, err, 422);
	if (req.body.parts != null) {
		[ err, parts ] = await to(serviceOrder.addParts(req.body.parts));
		if (err) return ReE(res, err, 422);
	}
	if (req.body.services != null) {
		[ err, services ] = await to(serviceOrder.addServices(req.body.services));
		if (err) return ReE(res, err, 422);
	}
	serviceOrder = serviceOrder.toWeb();
	serviceOrder.parts = parts;
	serviceOrder.services = services;
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
				{ model: Part, as: 'parts' },
				{ model: Service, as: 'services' }
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
				{ model: Part, as: 'parts' },
				{ model: Service, as: 'services' }
			]
		})
	);
	if (err) return ReE(res, err, 500);
	return ReS(res, serviceOrder, 200);
};

// Update serviceOrder
module.exports.update = async (req, res) => {
	[ err, serviceOrder ] = await to(ServiceOrder.update(req.body, { where: { id: req.body.id } }));
	if (err) return ReE(res, err, 422);
	
	return ReS(res, { 'MSG:': 'Atualizado com Sucesso ServiceOrder de ID: ' + req.body.id }, 201);
};

module.exports.addPartsAndServices = async (req, res) => {
	let err, serviceOrder, parts, services;
	[ err, serviceOrder ] = await to(ServiceOrder.findByPk(req.body.id));
	if (req.body.parts != null) {
		[ err, parts ] = await to(serviceOrder.addParts(req.body.parts));
		if (err) return ReE(res, err, 422);
	}
	if (req.body.services != null) {
		[ err, services ] = await to(serviceOrder.addServices(req.body.services));
		if (err) return ReE(res, err, 422);
	}
	return ReS(res, { 'MSG:': 'Atualizado com Sucesso ServiceOrder de ID: ' + req.body.id }, 201);
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
				{ model: Part, as: 'parts' },
				{ model: Service, as: 'services' }
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
				{ model: Part, as: 'parts' },
				{ model: Service, as: 'services' }
			]
		})
	);
	if (err) return ReE(res, err, 500);
	return ReS(res, serviceOrder, 200);
};
