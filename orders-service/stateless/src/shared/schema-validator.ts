import { ValidationError } from '@errors/validation-error';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export function schemaValidator(
  // biome-ignore lint/suspicious/noExplicitAny: record usage
  schema: Record<string, any>,
  // biome-ignore lint/suspicious/noExplicitAny: record usage
  body: Record<string, any>,
) {
  const ajv = new Ajv({
    allErrors: true,
  });

  addFormats(ajv);
  ajv.addSchema(schema);

  const valid = ajv.validate(schema, body);

  if (!valid) {
    const errorMessage = JSON.stringify(ajv.errors);
    throw new ValidationError(errorMessage);
  }
}
