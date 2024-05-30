const passport = require('passport');
require('../configs/passport')(passport);

const auth = passport.authenticate('jwt', { session: false });

module.exports = auth;
