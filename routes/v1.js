const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const ProductController = require('../controllers/part.controller');
const ServiceOrderController = require('../controllers/serviceOrder.controller');
const ServiceController = require('../controllers/service.controller');
const passport = require('passport');

require('./../middleware/passport')(passport);

router.post('/user', UserController.create);
router.get('/user', passport.authenticate('jwt', { session: false }), UserController.get);
router.get('/user/:id', passport.authenticate('jwt', { session: false }), UserController.getOne);
router.get('/users', passport.authenticate('jwt', { session: false }), UserController.getAll);
router.put('/user', passport.authenticate('jwt', { session: false }), UserController.update);
router.put('/user/:id', passport.authenticate('jwt', { session: false }), UserController.updateOne);
router.delete('/user', passport.authenticate('jwt', { session: false }), UserController.remove);
router.delete('/user/:id', passport.authenticate('jwt', { session: false }), UserController.del);
router.post('/login', UserController.login);
router.get('/verifytoken', UserController.verifytoken);


router.post('/part', ProductController.create);
router.get('/part/:id', passport.authenticate('jwt', { session: false }), ProductController.getOne);
router.get('/products', passport.authenticate('jwt', { session: false }), ProductController.getAll);
router.put('/part', passport.authenticate('jwt', { session: false }), ProductController.update);
router.delete('/part/:id', passport.authenticate('jwt', { session: false }), ProductController.del);

router.post('/service', ServiceController.create);
router.get('/service/:id', passport.authenticate('jwt', { session: false }), ServiceController.getOne);
router.get('/services', passport.authenticate('jwt', { session: false }), ServiceController.getAll);
router.put('/service', passport.authenticate('jwt', { session: false }), ServiceController.update);
router.delete('/service/:id', passport.authenticate('jwt', { session: false }), ServiceController.del);

router.post('/serviceorder', ServiceOrderController.create);
router.get('/serviceorder/:id', passport.authenticate('jwt', { session: false }), ServiceOrderController.getOne);
router.get('/serviceorders', passport.authenticate('jwt', { session: false }), ServiceOrderController.getAll);
router.put('/serviceorder', passport.authenticate('jwt', { session: false }), ServiceOrderController.update);
router.put('/addproductsandservices', passport.authenticate('jwt', { session: false }), ServiceOrderController.addPartsAndServices);
router.delete('/serviceorder/:id', passport.authenticate('jwt', { session: false }), ServiceOrderController.del);
router.get('/serviceorder/user/:id', passport.authenticate('jwt', { session: false }), ServiceOrderController.getOrdersFromClient);
router.get('/serviceorder/:id', passport.authenticate('jwt', { session: false }), ServiceOrderController.getOrdersFromEmployee);



module.exports = router;
