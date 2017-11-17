/*jshint esversion: 6 */
const path = require('path');
const homepage = function(req,res,next){
    //res.render(path.join(__dirname, '..', '/views/')+'index.twig');
    res.render('homepage.twig',{data:{title:'Homepage'}});
};

exports.homepage = homepage;