import * as moment from 'moment-timezone';
import { ValidationUtils } from '../util/validation-utils';
import { FieldValidation } from '../model/field.model';

export class DateValidation {

  question: FieldValidation;
  format: string;

  constructor(question: FieldValidation, format = "MM/DD/YYYY") {
    this.question = question;
    this.format = format;
  }

  gt(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (ValidationUtils.toMoment(value, this.format).isAfter(ValidationUtils.toMoment(compareWith[0], this.format)));
      let message = this.question.message || `${this.question.title} must have greater than ${ValidationUtils.toMoment(compareWith[0], this.format).format(this.format)} ${this.question.type}`;
      return { result: result, message: message };
    }
    return { result: true, message: '' }
  }

  lt(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (ValidationUtils.toMoment(value, this.format).isBefore(ValidationUtils.toMoment(compareWith[0], this.format)));
      let message = this.question.message || `${this.question.title} must have less than ${ValidationUtils.toMoment(compareWith[0], this.format).format(this.format)} ${this.question.type}`;
      return { result: result, message: message };
    }
    return { result: true, message: '' }
  }

  lte(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (ValidationUtils.toMoment(value, this.format).isSameOrBefore(ValidationUtils.toMoment(compareWith[0], this.format)))
      let message = this.question.message || `${this.question.title} must have less than or equal to ${ValidationUtils.toMoment(compareWith[0], this.format).format(this.format)} date`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }


  gte(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (ValidationUtils.toMoment(value, this.format).isSameOrAfter(ValidationUtils.toMoment(compareWith[0], this.format)))
      let message = this.question.message || `${this.question.title} must have greater than or equal to ${ValidationUtils.toMoment(compareWith[0], this.format).format(this.format)} date`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }

  }

  eq(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (ValidationUtils.toMoment(value, this.format).isSame(ValidationUtils.toMoment(compareWith[0], this.format)))
      let message = this.question.message || `${this.question.title} must be equal to ${ValidationUtils.toMoment(compareWith[0], this.format).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }

  notEqual(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (!(ValidationUtils.toMoment(value, this.format).isSame(ValidationUtils.toMoment(compareWith[0], this.format))))
      let message = this.question.message || `${this.question.title} must not be equal to ${ValidationUtils.toMoment(compareWith[0], this.format).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }

  between(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (ValidationUtils.toMoment(value, this.format).isBetween(ValidationUtils.toMoment(compareWith[0], this.format), ValidationUtils.toMoment(compareWith[1], this.format), undefined, '[]'))
      let message = this.question.message || `${this.question.title} must have ${this.question.type} between ${ValidationUtils.toMoment(compareWith[0], this.format).format(this.format)} to ${ValidationUtils.toMoment(compareWith[1], this.format).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }

  notBetween(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (!(ValidationUtils.toMoment(value, this.format).isBetween(ValidationUtils.toMoment(compareWith[0], this.format), ValidationUtils.toMoment(compareWith[1], this.format), undefined, '[]')))
      let message = this.question.message || `${this.question.title} must not have ${this.question.type} between ${ValidationUtils.toMoment(compareWith[0], this.format).format(this.format)} to ${ValidationUtils.toMoment(compareWith[1], this.format).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }
}
