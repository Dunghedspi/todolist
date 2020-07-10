const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('../controller/userController')();
const Router = express.Router();
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: false }));
Router.post('/signin', UserController.signIn);
Router.post('/signup', UserController.signUp);
Router.get('/getinfor/:id', UserController.getInfor);
module.exports = Router;
