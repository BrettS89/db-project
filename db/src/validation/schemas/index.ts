import { AnySchema } from 'ajv';

export const foreignKeys: AnySchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      field: { type: 'string' },
      populateToField: { type: 'string' },
    },
    required: ['field', 'populateToField'],
    additionalProperties: false,
  }
};

export const $getSchema: AnySchema = {
  type: 'object',
  properties: {
    method: { const: '$get' },
    collection: { type: 'string' },
    id: { type: 'string' },
  },
  required: ['method', 'collection', 'id'],
  additionalProperties: false,
};
