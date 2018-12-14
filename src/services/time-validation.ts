import * as moment from 'moment-timezone';
import { ValidationUtils } from '../util/validation-utils';
import { FieldValidation } from '../model/field.model';

export class TimeValidation {

  question: FieldValidation;
  format: string;

  constructor(question: FieldValidation, format = "HH:mm") {
    this.question = question;
    this.format = format;
  }

  gt(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = ValidationUtils.validateDate(value, compareWith[0], 'isAfter', this.format);
      let message = this.question.message || `${this.question.title} must be greater than ${moment(compareWith[0]).format(this.format)}`;
      return { result: result, message: message };
    }
    return { result: false, message: '' };
  }

  lt(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = ValidationUtils.validateDate(value, compareWith[0], 'isBefore', this.format);
      let message = this.question.message || `${this.question.title} must be less than ${moment(compareWith[0]).format(this.format)}`;
      return { result: result, message: message };
    }
    return { result: false, message: '' };
  }

  lte(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {

      let result = ValidationUtils.validateDate(value, compareWith[0], 'isSameOrBefore', this.format);
      let message = this.question.message || `${this.question.title} must be less than or equal to ${moment(compareWith[0]).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: false, message: '' }
  }


  gte(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = ValidationUtils.validateDate(value, compareWith[0], 'isSameOrAfter', this.format);
      let message = this.question.message || `${this.question.title} must be greater than or equal to ${moment(compareWith[0]).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: false, message: '' }

  }

  eq(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = ValidationUtils.validateDate(value, compareWith[0], 'isSame', this.format);
      let message = this.question.message || `${this.question.title} must be equal to ${moment(compareWith[0]).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: false, message: '' }
  }

  notEqual(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (!ValidationUtils.validateDate(value, compareWith[0], 'isSame', this.format));
      let message = this.question.message || `${this.question.title} must be not equal to ${moment(compareWith[0]).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: false, message: '' }
  }

  between(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (moment(moment(value).format(this.format), this.format).isBetween(moment(moment(compareWith[0])
        .format(this.format), this.format), moment(moment(compareWith[1]).format(this.format), this.format), undefined, '[]'))
      let message = this.question.message || `${this.question.title} must be between ${moment(compareWith[0]).format(this.format)} to ${moment(compareWith[1]).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: false, message: '' }
  }

  notBetween(value: Date | string, compareWith: Array<any>) {
    if (ValidationUtils.returnNull(compareWith)) {
      let result = (!(moment(moment(value).format(this.format), this.format)
        .isBetween(moment(moment(compareWith[0]).format(this.format), this.format), moment(moment(compareWith[1]).format(this.format), this.format))))
      let message = this.question.message || `${this.question.title} must be not between ${moment(compareWith[0]).format(this.format)} to ${moment(compareWith[1]).format(this.format)}`;
      return { result: result, message: message };
    }
    return { result: false, message: '' };
  }

}
