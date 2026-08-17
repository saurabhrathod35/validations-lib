import * as moment from 'moment';
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
      let result = (ValidationUtils.toMoment(value[0], this.format).isAfter(ValidationUtils.toMoment(tmpCompareWith[0], this.format)) && ValidationUtils.toMoment(value[1], this.format).isAfter(ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format)));
      let message = this.question.message || `${this.question.title} must be greater than  ${ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format).format(this.format)}`;
      return { result: result, message: message };
    }
    return { result: true, message: '' };
  }

  lt(value: Array<Date | string>, compareWith: Array<any>) {
    let tmpCompareWith = ValidationUtils.fieldBifurcation(compareWith);
    if (ValidationUtils.returnNull(tmpCompareWith)) {
      let result = (ValidationUtils.toMoment(value[0], this.format).isBefore(ValidationUtils.toMoment(tmpCompareWith[0], this.format)) && ValidationUtils.toMoment(value[1], this.format).isBefore(ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format)));
      let message = this.question.message || `${this.question.title} must be less than  ${ValidationUtils.toMoment(tmpCompareWith[0], this.format).format(this.format)}`;
      return { result: result, message: message };
    }
    return { result: true, message: '' }
  }

  lte(value: Array<Date | string>, compareWith: Array<any>) {
    let tmpCompareWith = ValidationUtils.fieldBifurcation(compareWith);
    if (ValidationUtils.returnNull(tmpCompareWith)) {
      let result = (ValidationUtils.toMoment(value[0], this.format).isSameOrBefore(ValidationUtils.toMoment(tmpCompareWith[0], this.format)) && ValidationUtils.toMoment(value[1], this.format).isSameOrBefore(ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format)));
      let message = this.question.message || `${this.question.title} must be less than or equal to ${ValidationUtils.toMoment(tmpCompareWith[0], this.format).format(this.format)}  `;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }


  gte(value: Array<Date | string>, compareWith: Array<any>) {
    let tmpCompareWith = ValidationUtils.fieldBifurcation(compareWith);
    if (ValidationUtils.returnNull(tmpCompareWith)) {
      let result = (ValidationUtils.toMoment(value[0], this.format).isSameOrAfter(ValidationUtils.toMoment(tmpCompareWith[0], this.format)) && ValidationUtils.toMoment(value[1], this.format).isSameOrAfter(ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format)));
      let message = this.question.message || `${this.question.title} must be greater than or equal to ${ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }

  }

  eq(value: Array<Date | string>, compareWith: Array<any>) {
    let tmpCompareWith = ValidationUtils.fieldBifurcation(compareWith);
    if (ValidationUtils.returnNull(tmpCompareWith)) {
      let result = (ValidationUtils.toMoment(value[0], this.format).isSame(ValidationUtils.toMoment(tmpCompareWith[0], this.format)) && ValidationUtils.toMoment(value[1], this.format).isSame(ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format)));
      let message = this.question.message || `${this.question.title} must be equal to ${ValidationUtils.toMoment(tmpCompareWith[0] || tmpCompareWith[1], this.format)
        .format(this.format)} to ${ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }

  notEqual(value: Array<Date | string>, compareWith: Array<any>) {
    let tmpCompareWith = ValidationUtils.fieldBifurcation(compareWith);
    if (ValidationUtils.returnNull(tmpCompareWith)) {
      let result = (!(ValidationUtils.toMoment(value[0], this.format).isSame(ValidationUtils.toMoment(tmpCompareWith[0], this.format))) && !(ValidationUtils.toMoment(value[1], this.format).isSame(ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format))));
      let message = this.question.message || `${this.question.title} must be not equal to ${ValidationUtils.toMoment(tmpCompareWith[0] || tmpCompareWith[1], this.format)
        .format(this.format)} to ${ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }

  between(value: Array<Date | string>, compareWith: Array<any>) {
    let tmpCompareWith = ValidationUtils.fieldBifurcation(compareWith);
    if (ValidationUtils.returnNull(tmpCompareWith)) {
      let result = (ValidationUtils.toMoment(value[0], this.format).isBetween(ValidationUtils.toMoment(tmpCompareWith[0], this.format), ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format), undefined, '[]'))
        && (ValidationUtils.toMoment(value[1], this.format).isBetween(ValidationUtils.toMoment(tmpCompareWith[0], this.format), ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format), undefined, '[]'));
      let message = this.question.message || `${this.question.title} must be between ${ValidationUtils.toMoment(tmpCompareWith[0], this.format)
        .format(this.format)} to ${ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format).format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }

  notBetween(value: Array<Date | string>, compareWith: Array<any>) {
    let tmpCompareWith = ValidationUtils.fieldBifurcation(compareWith);
    if (ValidationUtils.returnNull(tmpCompareWith)) {
      let result = (!(ValidationUtils.toMoment(value[0], this.format).isBetween(ValidationUtils.toMoment(tmpCompareWith[0], this.format), ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format), undefined, '[]'))
        && !(ValidationUtils.toMoment(value[1], this.format).isBetween(ValidationUtils.toMoment(tmpCompareWith[0], this.format), ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format), undefined, '[]')));
      let message = this.question.message || `${this.question.title} must be not between ${ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format)
        .format(this.format)} to ${ValidationUtils.toMoment(tmpCompareWith[1] || tmpCompareWith[0], this.format)
          .format(this.format)}`;
      return { result: result, message: message }
    }
    return { result: true, message: '' }
  }

}
