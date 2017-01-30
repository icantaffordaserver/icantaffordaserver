const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD,
  },
});

/**
 * GET /contact
 */
exports.contactGet = function (req, res) {
  res.render('contact', {
    title: 'Contact',
  });
};

/**
 * POST /contact
 */
exports.contactPost = function (req, res) {
  req.assert('first_name', 'First name cannot be blank').notEmpty();
  req.assert('last_name', 'Last name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('message', 'Message cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  const mailOptions = {
    from: `${req.body.first_name} ${req.body.last_name} ` + `<${req.body.email}>`,
    to: 'your@email.com',
    subject: '✔ Contact Form | Mega Boilerplate',
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (err) => {
    res.send({ msg: 'Thank you! Your feedback has been submitted.' });
  });
};
