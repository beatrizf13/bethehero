const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  store(req, res, next) {
    celebrate({
      [Segments.BODY]: Joi.object({
        id: Joi.string().required()
      }).unknown()
    });

    next();
  },

  isAuthenticadet(req, res, next) {
    celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
      }).unknown()
    });

    next();
  }
};
