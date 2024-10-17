const Joi = require("joi");

module.exports.posterSchema = Joi.object({
  poster: Joi.object({
    image: Joi.string().allow("", null),
  }).required(),
});

module.exports.nextEventSchema = Joi.object({
  nextEvent: Joi.object({
    title: Joi.string().required(),
    date:Joi.string().required(),
    time:Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow("", null),
    link: Joi.string().required(),
    venue: Joi.string().required(),
  }).required(),
});

module.exports.youtubeSchema = Joi.object({
  youtube: Joi.object({
    link: Joi.string().required(),
  }).required(),
});
