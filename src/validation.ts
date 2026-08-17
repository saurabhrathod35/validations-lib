
import { TextValidation } from './services/text-validation';
import { CheckboxValidation } from './services/checkbox-validation';
import { DateRangeValidation } from './services/date-range-validation';
import { DateValidation } from './services/date-validation';
import { TimeRangeValidation } from './services/time-range-validation';
import { MultiSelectDropDownValidation } from './services/multi-select-drop-down-validation';
import { TimeValidation } from './services/time-validation';
import { NumberValidationService } from './services/number-validation';
import { ValidationUtils } from './util/validation-utils';
import { FieldValidation } from './model/field.model';
import { ValidationResult, ConfigProblem, Messages } from './model/result.model';

export  class Validation {

  static validate(question: FieldValidation | any): ValidationResult {
    if (question) {
      if (question.required && ValidationUtils.isEmpty(question.currentValue)) {
        return Messages.apply('required', question, question.params, ValidationUtils.isRequired(question));
      }
      // A field may carry several conditions; the first failure is the answer.
      const steps = ValidationUtils.conditionSteps(question);
      let outcome: ValidationResult = { result: true, message: '', code: '' };
      for (const step of steps) {
        const evaluated = Validation.evaluate(question, step.condition, step.params);
        if (!evaluated.result) {
          return evaluated;
        }
        outcome = evaluated;
      }
      return outcome;
    }
  }

  private static evaluate(question: FieldValidation | any, condition: string, params: Array<any>): ValidationResult {
    const usable = ValidationUtils.hasEmptyValue(params) && ValidationUtils.hasEnoughParams(condition, params);
    if (!usable || !condition) {
      return { result: true, message: '', code: '' };
    }
    const validationInstance = Validation.getInstance(question);
    if (typeof validationInstance[condition] !== 'function') {
      return { result: true, message: '', code: '' };
    }
    return Messages.apply(condition, question, params, validationInstance[condition](question.currentValue, params));
  }
 
  // Reports fields the library cannot evaluate. validate() deliberately passes
  // on an unusable config rather than inventing a failure, which hides schema
  // typos — run this over your schema (in tests, or at startup) to see them.
  static check(question: FieldValidation | any): Array<ConfigProblem> {
    const problems: Array<ConfigProblem> = [];
    if (!question) {
      return [{ code: 'MISSING_FIELD', message: 'No field was given' }];
    }
    const steps = ValidationUtils.conditionSteps(question);
    if (Array.isArray(question.condition) && question.condition.length !== (question.params || []).length) {
      problems.push({
        code: 'PARAMS_NOT_ALIGNED',
        message: `${question.title || question.uid || 'field'}: ${question.condition.length} conditions but ${(question.params || []).length} param entries`
      });
    }
    const instance = Validation.getInstance(question);
    steps.forEach(step => {
      const label = `${question.title || question.uid || 'field'} (${step.condition || 'no condition'})`;
      if (!step.condition) {
        problems.push({ code: 'MISSING_CONDITION', message: `${label}: no condition to check` });
        return;
      }
      if (typeof instance[step.condition] !== 'function') {
        problems.push({ code: 'UNKNOWN_CONDITION', message: `${label}: not supported for type '${question.type}'` });
        return;
      }
      if (!ValidationUtils.hasEmptyValue(step.params) || !ValidationUtils.hasEnoughParams(step.condition, step.params)) {
        problems.push({ code: 'MISSING_PARAMS', message: `${label}: needs ${ValidationUtils.neededParams(step.condition)} usable param(s)` });
        return;
      }
      problems.push.apply(problems, ValidationUtils.paramProblems(question, step.condition, step.params, label));
    });
    return problems;
  }

  static validateWithGroup(entrys: Object, schema: Object, touchedFields?: object) {
    let questions = ValidationUtils.getFieldsByType(schema)
    if(!touchedFields){
      touchedFields={}
    } 
    
    let validations = {};
    (questions || []).forEach(question => {
      touchedFields[question.uid] =( touchedFields && touchedFields[question.uid]) ? touchedFields[question.uid] : true
      
      let singalQuestion = ValidationUtils.makeSimpleQuestion(question, entrys);
      if (singalQuestion.required && ValidationUtils.isEmpty(singalQuestion.currentValue)) {
        validations[question.uid] = Messages.apply('required', singalQuestion, singalQuestion.params, ValidationUtils.isRequired(singalQuestion));
      }

      else if (!ValidationUtils.isEmpty(singalQuestion.currentValue) && touchedFields[question.uid]) {
        validations[question.uid] = Validation.validate(singalQuestion);
      }
      else {
        validations[question.uid] = { result: true, message: '' }
      } 
    });
    validations['result'] = (<any>Object).values(validations).every(question => question.result)
    return validations;
  }


  static getInstance(question: FieldValidation): NumberValidationService | MultiSelectDropDownValidation | DateValidation | DateRangeValidation | TimeValidation | TimeRangeValidation | CheckboxValidation | TextValidation {
    switch (question.type) {
      case 'number':
      case 'currency':
      case 'percentage':
      case 'scientific':
      case 'exponential':
        return new NumberValidationService(question);

      case 'multiselect-dropdown':
        return new MultiSelectDropDownValidation(question);

      case 'date':
        return new DateValidation(question, question.format || "MM/DD/YYYY");

      case 'time':
        return new TimeValidation(question, question.format || 'HH:mm');

      case 'timeRange':
        return new TimeRangeValidation(question, question.format || 'HH:mm');

      case 'datetime':
        return new DateValidation(question, question.format || 'MM/DD/YYYY, HH:mm');

      case 'dateRange':
        return new DateRangeValidation(question, question.format || 'MM/DD/YYYY');

      case 'dateTimeRange':
        return new DateRangeValidation(question, question.format || 'MM/DD/YYYY, HH:mm');

      case 'checkbox':
        return new CheckboxValidation(question);

      default:
        return new TextValidation(question);
    }
  }



}
