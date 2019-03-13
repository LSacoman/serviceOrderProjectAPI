const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const ProductController = require('../controllers/product.controller');
const ServiceOrderController = require('../controllers/serviceOrder.controller');
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


router.post('/product', ProductController.create);
router.get('/product/:id', passport.authenticate('jwt', { session: false }), ProductController.getOne);
router.get('/products', passport.authenticate('jwt', { session: false }), ProductController.getAll);
router.put('/product', passport.authenticate('jwt', { session: false }), ProductController.update);
router.delete('/product/:id', passport.authenticate('jwt', { session: false }), ProductController.del);


router.post('/serviceorder', ServiceOrderController.create);
router.get('/serviceorder/:id', passport.authenticate('jwt', { session: false }), ServiceOrderController.getOne);
router.get('/serviceorders', passport.authenticate('jwt', { session: false }), ServiceOrderController.getAll);
router.put('/serviceorder', passport.authenticate('jwt', { session: false }), ServiceOrderController.update);
router.delete('/serviceorder/:id', passport.authenticate('jwt', { session: false }), ServiceOrderController.del);
router.get('/serviceorder/:id', passport.authenticate('jwt', { session: false }), ServiceOrderController.getOrdersFromClient);
router.get('/serviceorder/:id', passport.authenticate('jwt', { session: false }), ServiceOrderController.getOrdersFromEmployee);



module.exports = router;
