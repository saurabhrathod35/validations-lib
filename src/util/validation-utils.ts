import * as moment from 'moment';
import { FieldValidation } from '../model/field.model';

export class ValidationUtils {

  static toNumber(value: any): number {
    if (isNaN(value)) {
      return value.length;
    } else {
      return parseInt(value);
    }
  }

  static arrayLength(value: Array<any>): number {
    return (value || []).filter((item: any) => item).length;
  }

  static fieldBifurcation(compareWith: Array<any>) {
    if (compareWith && compareWith[0]) {
      if (Array.isArray(compareWith[0])) {
        return JSON.parse(JSON.stringify(compareWith).replace(/((?:\[\")|(?:\"\]))/g, '"'));
      } else {
        return compareWith;
      }
    }
  }

  static validateDate(firstValue: string | Date, secondValue: string | Date, condition: string = 'isSame', format = "HH:mm") {
    return moment(ValidationUtils.toMoment(firstValue, format).format(format), format)[condition](
      moment(ValidationUtils.toMoment(secondValue, format).format(format), format))
  }

  // Parse with the field's own format first, so DD/MM/YYYY input is not read as
  // MM/DD/YYYY. Dates and ISO strings still parse the way moment expects, and
  // anything unrecognised falls back rather than throwing.
  static toMoment(value: any, format?: string) {
    if (value instanceof Date || moment.isMoment(value)) {
      return moment(value);
    }
    if (format && typeof value === 'string') {
      const parsed = moment(value, format, true);
      if (parsed.isValid()) {
        return parsed;
      }
    }
    const iso = moment(value, moment.ISO_8601, true);
    return iso.isValid() ? iso : moment(new Date(value));
  }

  static checkIsArray(value: Array<any> | string) {
    if (Array.isArray(value))
      return value.length;
    else {
      return parseInt(value);
    }
  }

  // True when at least `minimum` usable bounds are present. 0 and false are
  // usable values; only null/undefined/'' are not.
  static returnNull(array: Array<any>, minimum: number = 1) {
    return ValidationUtils.presentValues(array).length >= minimum;
  }

  static hasEmptyValue(params: Array<any>) {
    return ValidationUtils.presentValues(params).length === (params || []).length;
  }

  static presentValues(params: Array<any>) {
    return (params || []).filter(item => item !== null && item !== undefined && item !== '');
  }

  // Whitespace is not a value — '   ' fails `required`, as it should.
  static isEmpty(value: any) {
    return value === null || value === undefined || value === ''
      || (typeof value === 'string' && value.trim() === '')
      || (Array.isArray(value) && ValidationUtils.arrayLength(value) === 0);
  }

  // between/notBetween need both bounds, notBlank needs none, the rest need one.
  static neededParams(condition: string) {
    if (condition === 'between' || condition === 'notBetween') {
      return 2;
    }
    return (condition === 'notBlank') ? 0 : 1;
  }

  static hasEnoughParams(condition: string, params: Array<any>) {
    return ValidationUtils.returnNull(params, ValidationUtils.neededParams(condition));
  }

  // Bounds that exist but can never work: text 'abc' where a number is needed,
  // a regex that will not compile, a date the parser cannot read.
  static paramProblems(question: any, condition: string, params: Array<any>, label: string) {
    const problems = [];
    const numeric = ['number', 'currency', 'percentage', 'scientific', 'exponential'].indexOf(question.type) !== -1;
    const dated = ['date', 'datetime', 'dateRange', 'dateTimeRange', 'time', 'timeRange'].indexOf(question.type) !== -1;

    (params || []).forEach(param => {
      if (typeof param === 'string' && param.charAt(0) === '#') {
        return; // a reference to another field, resolved at validation time
      }
      if (condition === 'matches' || condition === 'notMatches') {
        try {
          new RegExp(param);
        } catch (error) {
          problems.push({ code: 'INVALID_PATTERN', message: `${label}: '${param}' is not a valid regular expression` });
        }
        return;
      }
      if (numeric && isNaN(parseFloat(param))) {
        problems.push({ code: 'INVALID_NUMBER_PARAM', message: `${label}: '${param}' is not a number` });
        return;
      }
      if (dated && !ValidationUtils.toMoment(param, question.format).isValid()) {
        problems.push({ code: 'INVALID_DATE_PARAM', message: `${label}: '${param}' is not a readable date` });
      }
    });
    return problems;
  }

  // One condition uses `params` as-is. Several conditions pair up with `params`
  // by index, each entry holding that condition's own bounds:
  //   condition: ['gte', 'matches'], params: [[8], ['\\d']]
  static conditionSteps(question: any): Array<{ condition: string, params: Array<any> }> {
    if (!Array.isArray(question.condition)) {
      return [{ condition: question.condition, params: question.params }];
    }
    return question.condition.map((condition: string, index: number) => {
      const params = (question.params || [])[index];
      return { condition: condition, params: Array.isArray(params) ? params : [params] };
    });
  }

 static isRequired(question){
   return {result:false,message:(question.title || '') + ' is Required'}
 }
  static getFieldsByType(arrayOrObject) {
    const questions = [];
    if (!arrayOrObject) {
      return questions;
    }
    (arrayOrObject.blocks || arrayOrObject.sections || arrayOrObject.fields || arrayOrObject).forEach((block) => {
      (block.sections || block.fields || [block]).forEach((section) => {
        (section.fields || [section]).forEach((field) => {
          const newField = JSON.parse(JSON.stringify(field));
          questions.push(newField);
        });
      });
    });
    return questions;
  }


  static makeSimpleQuestion(question: any, entry: object) { 
    let questionConfig = new FieldValidation(question,entry)
     
    const makeSimpleQuestionClosure = (type) => {
      if (
        question && question.validation &&
        question.validation.condition &&
        question.validation.condition[type] &&
        question.validation.condition[type].value
      ) {
        let tempValue = question.validation.condition[type].value;
        let value = (question.validation.condition[type].type === 'field') ? entry[tempValue] : tempValue;

        questionConfig.setParams(value)
      }
    }

    makeSimpleQuestionClosure('min');
    makeSimpleQuestionClosure('max');
  
    return questionConfig;
  }


}
