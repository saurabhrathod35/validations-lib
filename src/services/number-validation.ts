import { FieldValidation } from "../model/field.model";

export class NumberValidationService {
  question: FieldValidation;

  constructor(question: FieldValidation) {
    this.question = question;
  }

  gt(value: any, compareWith: Array<any>) {
    let result = (parseFloat(value) > parseFloat(compareWith[0]));
    let message = this.question.message || `${this.question.title} must be greater than ${parseFloat(compareWith[0])}`;
    return { result: result, message: message };
  }

  lt(value: any, compareWith: Array<any>) {
    let result = (parseFloat(value) < parseFloat(compareWith[0]))
    let message = this.question.message || `${this.question.title} must be less than ${parseFloat(compareWith[0])}`;
    return { result: result, message: message };
  }

  lte(value: any, compareWith: Array<any>) {
    let result = (parseFloat(value) <= parseFloat(compareWith[0]))
    let message = this.question.message || `${this.question.title} must be less than or equal to ${parseFloat(compareWith[0])}`;
    return { result: result, message: message }
  }


  gte(value: any, compareWith: Array<any>) {
    let result = (parseFloat(value) >= parseFloat(compareWith[0]))
    let message = this.question.message || `${this.question.title} must be greater than or equal to ${parseFloat(compareWith[0])}`;
    return { result: result, message: message }

  }

  eq(value: any, compareWith: Array<any>) {
    let result = (parseFloat(value) == parseFloat(compareWith[0]))
    let message = this.question.message || `${this.question.title} must be equal to ${parseFloat(compareWith[0])}`;
    return { result: result, message: message }

  }

  notEqual(value: any, compareWith: Array<any>) {
    let result = (parseFloat(value) != parseFloat(compareWith[0]))
    let message = this.question.message || `${this.question.title} must be not equal to ${parseFloat(compareWith[0])}`;
    return { result: result, message: message }
  }

  between(value: any, compareWith: Array<any>) {
    let result = ((parseFloat(value) > parseFloat(compareWith[0])) && (parseFloat(value) < parseFloat(compareWith[1])))
    let message = this.question.message || `${this.question.title} must be between ${parseFloat(compareWith[0])} to ${(compareWith[1])}`;
    return { result: result, message: message }
  }

  notBetween(value: any, compareWith: Array<any>) {
    let result = (!((parseFloat(value) >= parseFloat(compareWith[0])) && (parseFloat(value) <= parseFloat(compareWith[1]))))
    let message = this.question.message || `${this.question.title} must be not between ${parseFloat(compareWith[0])} to ${(compareWith[1])}`;
    return { result: result, message: message }
  }
}
