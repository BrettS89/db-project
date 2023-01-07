import { AnySchema } from 'ajv';

export interface Model {
  name: string;
  schema: AnySchema;
  foreignKeys?: {
    field: string;
    populateToField: string;
  }[]
}

export interface Input {
  method: '$get' | '$create' | '$update'
  collection: string;
  id?: string;
  query?: Record<string, any>;
  data?: Record<string, any>;
}
