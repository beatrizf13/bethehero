const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  index(req, res, next) {
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
      })
    });

    next();
  },

  store(req, res, next) {
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
      })
    });

    next();
  },

  delete(req, res, next) {
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
      })
    });

    next();
  }
};
