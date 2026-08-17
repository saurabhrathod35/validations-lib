export { Validation } from './validation';
export { FieldValidation } from './model/field.model';
export { ValidationResult, ConfigProblem, MessageOverrides, Messages } from './model/result.model';

/** @deprecated Left in place so 2.x stays backwards compatible; will go in 3.0.0. */
export const Greeter = (name: string) => `Hello ${name}`;
