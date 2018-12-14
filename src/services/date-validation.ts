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
      let result = (moment(value).isAfter(compareWith[0]));
      let message = this.question.message || `${this.question.title} must have greater than ${moment(compareWith[0]).format(this.format)} ${this.question.type}`;
      return { result: result, message: message };
    }
    return { result: true, message: '' }
  }

  lt(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (moment(value).isBefore(compareWith[0]));
      let message = this.question.message || `${this.question.title} must have less than ${moment(compareWith[0]).format(this.format)} ${this.question.type}`;
      return { result: result, message: message };
    }
    return { result: true, message: '' }
  }

  lte(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (moment(value).isSameOrBefore(compareWith[0]))
      let message = this.question.message || `${this.question.title} must have less than or equal to ${moment(compareWith[0]).format(this.format)} date`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }


  gte(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (moment(value).isSameOrAfter(compareWith[0]))
      let message = this.question.message || `${this.question.title} must have greater than or equal to ${moment(compareWith[0]).format(this.format)} date`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }

  }

  eq(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (moment(value).isSame(compareWith[0]))
      let message = this.question.message || `${this.question.title} must be equal to ${moment(compareWith[0]).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }

  notEqual(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (!(moment(value).isSame(compareWith[0])))
      let message = this.question.message || `${this.question.title} must not be equal to ${moment(compareWith[0]).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }

  between(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (moment(value).isBetween(compareWith[0], compareWith[1], undefined, '[]'))
      let message = this.question.message || `${this.question.title} must have ${this.question.type} between ${moment(compareWith[0]).format(this.format)} to ${moment(compareWith[1]).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }

  notBetween(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (!(moment(value).isBetween(compareWith[0], compareWith[1])))
      let message = this.question.message || `${this.question.title} must not have ${this.question.type} between ${moment(compareWith[0]).format(this.format)} to ${moment(compareWith[1]).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }
}
