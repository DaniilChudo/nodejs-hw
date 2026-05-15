import Joi from 'joi';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteIdSchemaCustom = Joi.string().custom((value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('Invalid ID');
  }
  return value;
});

export const getAllNotesSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
    search: Joi.string().allow('').optional(),
  }),
};

export const noteIdSchema = {
  params: Joi.object({
    noteId: noteIdSchemaCustom.required(),
  }),
};

export const createNoteSchema = {
  body: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow('').optional(),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }),
};

export const updateNoteSchema = {
  params: Joi.object({
    noteId: noteIdSchemaCustom.required(),
  }),
  body: Joi.object({
    title: Joi.string().min(1).optional(),
    content: Joi.string().allow('').optional(),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }).or('title', 'content', 'tag'),
};
