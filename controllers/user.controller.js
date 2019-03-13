const { User } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
const bcrypt = require('bcrypt');

const create = async function(req, res) {
	const body = req.body;

	if (!body.email && !body.login) {
		return ReE(res, 'Please enter an email or login to register.');
	} else if (!body.password) {
		return ReE(res, 'Please enter a password to register.');
	} else {
		let err, user;
		[ err, user ] = await to(User.create(body));
		if (err) return ReE(res, err, 422);
		return ReS(
			res,
			{
				message: 'Successfully created new user.',
				user: user.toWeb(),
				token: user.getJWT()
			},
			201
		);
	}
};
module.exports.create = create;

const get = async function(req, res) {
	let user = req.user;
	return ReS(res, { user: user.toWeb() });
};
module.exports.get = get;

module.exports.getAll = async (req, res) => {
	[ err, user ] = await to(User.findAll());
	if (err) return ReE(res, err, 500);
	return ReS(res, user, 200);
};

module.exports.getOne = async (req, res) => {
	[ err, user ] = await to(User.findByPk(req.params.id));
	if (err) return ReE(res, err, 500);
	return ReS(res, user, 200);
};

const update = async function(req, res) {
	let err, user, data;
	user = req.user;
	data = req.body;
	user.set(data);

	[ err, user ] = await to(user.save());
	if (err) {
		if (err.message == 'Validation error') err = 'The email address or phone number is already in use';
		return ReE(res, err);
	}
	return ReS(res, { message: 'Updated User: ' + user.id });
};
module.exports.update = update;

// Update One user
module.exports.updateOne = async (req, res) => {
	let userToUpdate;
	if (req.body.password == null) {
		userToUpdate = {
			login: req.body.login,
			email: req.body.email,
			name: req.body.name,
			phone: req.body.phone,
			dateofbirth: req.body.dateofbirth,
			gender: req.body.gender,
			administrator: req.body.administrator
		};
	} else {
		userToUpdate = req.body;
		[ err, hash ] = await to(bcrypt.hash(userToUpdate.password, CONFIG.jwt_salt));
		if (err != null) TE('Erro Ao Gerar Hash');
		userToUpdate.password = hash;
	}
	[ err, user ] = await to(User.update(userToUpdate, { where: { id: req.params.id } }));
	if (err) return ReE(res, err, 422);
	return ReS(res, { 'MSG:': 'Atualizado com Sucesso User de ID: ' + req.params.id }, 201);
};

const remove = async function(req, res) {
	let user, err;
	user = req.user;

	[ err, user ] = await to(user.destroy());
	if (err) return ReE(res, 'error occured trying to delete user');

	return ReS(res, { message: 'Deleted User' }, 204);
};
module.exports.remove = remove;

// Delete user
module.exports.del = async (req, res) => {
	[ err, user ] = await to(User.destroy({ where: { id: req.params.id } }));
	if (err) return ReE(res, err, 500);
	return ReS(res, { 'MSG:': 'Usuario de ID: ' + req.params.id + ' deletado!' }, 201);
};

const login = async function(req, res) {
	let err, user;

    if(req.body.login != null){
        [ err, user ] = await to(User.findOne({ where: { login: req.body.login }}));
    }else if(req.body.email != null){
        [err, user] = await to(User.findOne({ where: { email: req.body.email }}));
    }else{
        return ReE(res, {message: 'Necessario login ou email'}, 422);
    }
    if (err) return ReE(res, err, 422);
    [err, user] = await to(user.comparePassword(req.body.password));
    if (err) return ReE(res, err, 422);

	return ReS(res, { token: user.getJWT(), user: user.toWeb() });
};
module.exports.login = login;

const verifytoken = async function(req, res) {
	const token = req.headers.authorization.replace('Bearer ', '');
	jwt.verify(token, CONFIG.jwt_encryption, (err, decoded) => {
		if (err) return ReS(res, { message: 'invalid token' }, 401);
		return ReS(res, { message: 'valid token' }, 200);
	});
};
module.exports.verifytoken = verifytoken;
