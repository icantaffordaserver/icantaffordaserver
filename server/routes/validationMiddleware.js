/**
 * Created by alexandermann on 2017-01-10.
 */
export function validateUserSignUp(req, res, next){
    req.checkBody('first_name', 'First name cannot be blank.').notEmpty();
    req.checkBody('last_name', 'Last name cannot be blank.').notEmpty();
    req.checkBody('email', 'Email cannot be blank.').notEmpty();
    req.checkBody('email', 'Email is not valid.').isEmail();
    req.checkBody('password', 'Password cannot be blank.').notEmpty();
    req.sanitize('email').normalizeEmail({remove_dots: false});

    let errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }
    next();
}

export function validateUserLogin(req, res, next){
    req.checkBody('email', 'Email cannot be blank.').notEmpty();
    req.checkBody('email', 'Email is not valid.').isEmail();
    req.checkBody('password', 'Password cannot be blank.').notEmpty();
    req.sanitize('email').normalizeEmail({remove_dots: false});

    let errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }
    next();
}

export function validateUpdateAccount(req, res, next){
    if ('password' in req.body) {
        req.checkBody('password', 'Password must be at least 4 characters long').len(4);
        req.checkBody('confirm', 'Passwords must match').equals(req.body.password);
    } else {
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('email', 'Email cannot be blank').notEmpty();
        req.sanitize('email').normalizeEmail({remove_dots: false});
    }

    let errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }
    next();
}

export function validateForgotPassword(req, res, next){
    req.checkBody('email', 'Email is not valid.').isEmail();
    req.checkBody('email', 'Email cannot be blank.').notEmpty();
    req.sanitize('email').normalizeEmail({remove_dots: false});

    let errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }
    next();
}

export function validateNewInvite(req, res, next){
    req.checkBody('first_name', 'First name cannot be blank.').notEmpty();
    req.checkBody('last_name', 'Last name cannot be blank.').notEmpty();
    req.checkBody('email', 'Email is not valid.').isEmail();
    req.checkBody('email', 'Email cannot be blank.').notEmpty();
    req.sanitize('email').normalizeEmail({remove_dots: false});

    let errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }
    next();
}