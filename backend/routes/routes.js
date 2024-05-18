const express=require('express');
const {registerUser, login, logout,myprofile} = require('../controllers/authController');
const { isauthenticateuser,isadmin } = require('../middleware/authenticate');
const { addProduct,getAllReviews , deleteProduct, getAllProduct, editReview } = require('../controllers/productcontroller');
const router=express.Router();
//user routes
router.route('/register').post(registerUser);
router.route('/login').post (login);
router.route('/logout').post(logout);
router.route('/myprofile').get(isauthenticateuser,myprofile);


//productroutes
router.route('/addproduct').post(isauthenticateuser,addProduct);
router.route('/delete/:id').delete(deleteProduct);  
router.route('/edit/:id').put(editReview);
router.route('/allproducts').get(getAllProduct);
router.route('/reviews/:id').get(getAllReviews);



module.exports=router