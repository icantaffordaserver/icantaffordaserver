/**
 * Created by AlexanderMann on 2016-10-13.
 */
//404 not found
module.exports = function (req, res, next) {
    res.status(404);
    res.render('404', {title: '404 not found'});
};