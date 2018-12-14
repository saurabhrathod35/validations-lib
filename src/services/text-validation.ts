import { ValidationUtils } from '../util/validation-utils';
import { FieldValidation } from '../model/field.model';

export class TextValidation {

  question: FieldValidation;
  constructor(question: FieldValidation) {
    this.question = question;
  }

  gt(value: string, compareWith: Array<string>) {
    let compareValue = ValidationUtils.toNumber(compareWith[0]);
    let result = (value.length > compareValue);
    let message = this.question.message || `${this.question.title} must be greater than ${compareValue}`;
    return { result: result, message: message };
  }

  lt(value: string, compareWith: Array<string>) {
    let compareValue = ValidationUtils.toNumber(compareWith[0])
    let result = (value.length < compareValue)
    let message = this.question.message || `${this.question.title} must be less than ${compareValue}`;
    return { result: result, message: message };
  }

  lte(value: string, compareWith: Array<string>) {
    let compareValue = ValidationUtils.toNumber(compareWith[0]);
    let result = (value.length <= compareValue)
    let message = this.question.message || `${this.question.title} must be less than or equal to ${compareValue}`;
    return { result: result, message: message }
  }


  gte(value: string, compareWith: Array<string>) {
    let compareValue = ValidationUtils.toNumber(compareWith[0])
    let result = (value.length >= compareValue)
    let message = this.question.message || `${this.question.title} must be greater than or equal to ${compareValue}`;
    return { result: result, message: message }

  }

  eq(value: string, compareWith: Array<string>) {
    let compareValue = ValidationUtils.toNumber(compareWith[0])
    let result = (value.length == compareValue)
    let message = this.question.message || `${this.question.title} must be equal to ${compareValue}`;
    return { result: result, message: message }

  }

  notEqual(value: string, compareWith: Array<string>) {
    let compareValue = ValidationUtils.toNumber(compareWith[0])
    let result = (value.length != compareValue)
    let message = this.question.message || `${this.question.title} must be not equal to ${compareWith[0]}`;
    return { result: result, message: message }
  }

  between(value: string, compareWith: Array<string>) {
    let firstValue = ValidationUtils.toNumber(compareWith[0])
    let secondValue = ValidationUtils.toNumber(compareWith[1])

    let result = ((value.length > firstValue) && (value.length < secondValue))
    let message = this.question.message || `${this.question.title} must be between ${firstValue} to ${secondValue}`;
    return { result: result, message: message }
  }

  notBetween(value: string, compareWith: Array<string>) {
    let firstValue = ValidationUtils.toNumber(compareWith[0])
    let secondValue = ValidationUtils.toNumber(compareWith[1]);
    let result = (!((value.length >= firstValue) && (value.length <= secondValue)))
    let message = this.question.message || `${this.question.title} must be not between ${firstValue} to ${secondValue}`;
    return { result: result, message: message }
  };

  sameAs(value: string, compareWith: Array<string>) {
    let result = (value == compareWith[0])
    let message = this.question.message || `${this.question.title} must be equal to ${compareWith[0]}`;
    return { result: result, message: message }
  };

  notSame(value: string, compareWith: Array<string>) {
    let result = (value != compareWith[0])
    let message = this.question.message || `${this.question.title} must be equal to ${compareWith[0]}`;
    return { result: result, message: message }
  };


  contains(value: string, compareWith: Array<string>) {
    let result = (value.includes(compareWith[0]))
    let message = this.question.message || `${this.question.title} must contain ${compareWith[0]}`;
    return { result: result, message: message }
  }

  notContains(value: string, compareWith: Array<string>) {
    let result = (!(value.includes(compareWith[0])));
    let message = this.question.message || `${this.question.title} must not contain ${compareWith[0]}`;
    return { result: result, message: message };
  }

  startwith(value: string, compareWith: Array<string>) {
    let result = ((value || '').startsWith(compareWith[0]))
    let message = this.question.message || `${this.question.title} must be start with ${compareWith[0]}`;
    return { result: result, message: message }
  };

  endswith(value: string, compareWith: Array<string>) {
    let result = ((value || '').endsWith(compareWith[0]))
    let message = this.question.message || `${this.question.title} must ends with ${compareWith[0]}`;
    return { result: result, message: message }
  };
}
