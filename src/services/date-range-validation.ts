import * as moment from 'moment-timezone';
import { ValidationUtils } from '../util/validation-utils';
import { FieldValidation } from '../model/field.model';

export class DateRangeValidation {

  question: FieldValidation;
  format: string;
  
  constructor(question: FieldValidation, format = "MM/DD/YYYY") {
    this.question = question;
    this.format = format;
  }

  gt(value: Array<Date | string>, compareWith: Array<any>) {
    let tmpCompareWith = ValidationUtils.fieldBifurcation(compareWith);
    if (ValidationUtils.returnNull(tmpCompareWith)) {
      let result = (moment(value[0]).isAfter(tmpCompareWith[0]) && moment(value[1]).isAfter((tmpCompareWith[1] || tmpCompareWith[0])));
      let message = this.question.message || `${this.question.title} must be greater than  ${moment(tmpCompareWith[1] || tmpCompareWith[0]).format(this.format)}`;
      return { result: result, message: message };
    }
    return { result: true, message: '' };
  }

  lt(value: Array<Date | string>, compareWith: Array<any>) {
    let tmpCompareWith = ValidationUtils.fieldBifurcation(compareWith);
    if (ValidationUtils.returnNull(tmpCompareWith)) {
      let result = (moment(value[0]).isBefore((tmpCompareWith[0])) && moment(value[1]).isBefore((tmpCompareWith[1] || tmpCompareWith[0])));
      let message = this.question.message || `${this.question.title} must be less than  ${moment(tmpCompareWith[0]).format(this.format)}`;
      return { result: result, message: message };
    }
    return { result: true, message: '' }
  }

  lte(value: Array<Date | string>, compareWith: Array<any>) {
    let tmpCompareWith = ValidationUtils.fieldBifurcation(compareWith);
    if (ValidationUtils.returnNull(tmpCompareWith)) {
      let result = (moment(value[0]).isSameOrBefore((tmpCompareWith[0])) && moment(value[1]).isSameOrBefore((tmpCompareWith[1] || tmpCompareWith[0])));
      let message = this.question.message || `${this.question.title} must be less than or equal to ${moment(tmpCompareWith[0]).format(this.format)}  `;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }


  gte(value: Array<Date | string>, compareWith: Array<any>) {
    let tmpCompareWith = ValidationUtils.fieldBifurcation(compareWith);
    if (ValidationUtils.returnNull(tmpCompareWith)) {
      let result = (moment(value[0]).isSameOrAfter((tmpCompareWith[0])) && moment(value[1]).isSameOrAfter((tmpCompareWith[1] || tmpCompareWith[0])));
      let message = this.question.message || `${this.question.title} must be greater than or equal to ${moment(tmpCompareWith[1] || tmpCompareWith[0]).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }

  }

  eq(value: Array<Date | string>, compareWith: Array<any>) {
    let tmpCompareWith = ValidationUtils.fieldBifurcation(compareWith);
    if (ValidationUtils.returnNull(tmpCompareWith)) {
      let result = (moment(value[0]).isSame((tmpCompareWith[0])) && moment(value[1]).isSame((tmpCompareWith[1] || tmpCompareWith[0])));
      let message = this.question.message || `${this.question.title} must be equal to ${moment(tmpCompareWith[0] || tmpCompareWith[1])
        .format(this.format)} to ${moment(tmpCompareWith[1] || tmpCompareWith[0]).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }

  notEqual(value: Array<Date | string>, compareWith: Array<any>) {
    let tmpCompareWith = ValidationUtils.fieldBifurcation(compareWith);
    if (ValidationUtils.returnNull(tmpCompareWith)) {
      let result = (!(moment(value[0]).isSame(tmpCompareWith[0])) && !(moment(value[1]).isSame((tmpCompareWith[1] || tmpCompareWith[0]))));
      let message = this.question.message || `${this.question.title} must be not equal to ${moment(tmpCompareWith[0] || tmpCompareWith[1])
        .format(this.format)} to ${moment(tmpCompareWith[1] || tmpCompareWith[0]).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }

  between(value: Array<Date | string>, compareWith: Array<any>) {
    let tmpCompareWith = ValidationUtils.fieldBifurcation(compareWith);
    if (ValidationUtils.returnNull(tmpCompareWith)) {
      let result = (moment(value[0]).isBetween(tmpCompareWith[0], (tmpCompareWith[1] || tmpCompareWith[0]), undefined, '[]'))
        && (moment(value[1]).isBetween(tmpCompareWith[0], (tmpCompareWith[1]), undefined, '[]'));
      let message = this.question.message || `${this.question.title} must be between ${moment(tmpCompareWith[0])
        .format(this.format)} to ${moment(tmpCompareWith[1] || tmpCompareWith[0]).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }

  notBetween(value: Array<Date | string>, compareWith: Array<any>) {
    let tmpCompareWith = ValidationUtils.fieldBifurcation(compareWith);
    if (ValidationUtils.returnNull(tmpCompareWith)) {
      let result = (!(moment(value[0]).isBetween(tmpCompareWith[0], (tmpCompareWith[1] || tmpCompareWith[0]), undefined, '[]'))
        && (moment(value[1]).isBetween(tmpCompareWith[0], (tmpCompareWith[1]), undefined, '[]')));
      let message = this.question.message || `${this.question.title} must be not between ${moment(tmpCompareWith[1] || tmpCompareWith[0])
        .format(this.format)} to ${moment(tmpCompareWith[1] || tmpCompareWith[0])
          .format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }

}
