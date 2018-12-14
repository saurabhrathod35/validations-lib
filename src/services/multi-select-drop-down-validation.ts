import { ValidationUtils } from '../util/validation-utils';
import { FieldValidation } from '../model/field.model';

export class MultiSelectDropDownValidation {


  question: FieldValidation;
  constructor(question: FieldValidation) {
    this.question = question;
  }

  gt(value: Array<any>, compareWith: Array<any>) {
    let result = (value.length > ValidationUtils.checkIsArray(compareWith[0]))
    let message = this.question.message || `${this.question.title} must have greater than ${ValidationUtils.checkIsArray(compareWith[0])} selected value(s)`;
    return { result: result, message: message };
  }

  lt(value: Array<any>, compareWith: Array<any>) {
    let result = (value.length < ValidationUtils.checkIsArray(compareWith[0]))
    let message = this.question.message || `${this.question.title} must have less than ${ValidationUtils.checkIsArray(compareWith[0])} selected value(s)`;
    return { result: result, message: message };
  }

  lte(value: Array<any>, compareWith: Array<any>) {
    let result = (value.length <= ValidationUtils.checkIsArray(compareWith[0]))
    let message = this.question.message || `${this.question.title} must have less than or equal to ${ValidationUtils.checkIsArray(compareWith[0])} selected value(s)`;
    return { result: result, message: message }
  }

  gte(value: Array<any>, compareWith: Array<any>) {
    let result = (value.length >= ValidationUtils.checkIsArray(compareWith[0]))
    let message = this.question.message || `${this.question.title} must have greater than or equal to ${ValidationUtils.checkIsArray(compareWith[0])} selected value(s)`;
    return { result: result, message: message }
  }

  eq(value: Array<any>, compareWith: Array<any>) {
    let result = (value.length == ValidationUtils.checkIsArray(compareWith[0]))
    let message = this.question.message || `${this.question.title} must have ${ValidationUtils.checkIsArray(compareWith[0])} selected value(s)`;
    return { result: result, message: message }
  }

  notEqual(value: Array<any>, compareWith: Array<any>) {
    let result = (value.length != ValidationUtils.checkIsArray(compareWith[0]))
    let message = this.question.message || `${this.question.title} must not have ${ValidationUtils.checkIsArray(compareWith[0])} selected value(s)`;
    return { result: result, message: message }
  }

  between(value: Array<any>, compareWith: Array<any>) {
    let result = ((value.length > ValidationUtils.checkIsArray(compareWith[0])) && (value.length < ValidationUtils.checkIsArray(compareWith[1])))
    let message = this.question.message || `${this.question.title} must have number of value(s) selected between ${ValidationUtils.checkIsArray(compareWith[0])} to ${(compareWith[1])}`;
    return { result: result, message: message }
  }

  notBetween(value: Array<any>, compareWith: Array<any>) {
    let result = (!((value.length >= ValidationUtils.checkIsArray(compareWith[0])) && (value.length <= ValidationUtils.checkIsArray(compareWith[1]))))
    let message = this.question.message || `${this.question.title} must not have number of selected value(s) between ${ValidationUtils.checkIsArray(compareWith[0])} to ${(compareWith[1])}`;
    return { result: result, message: message }
  }
}

