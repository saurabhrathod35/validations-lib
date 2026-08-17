export class FieldValidation {
    public title: string;
    public type: string;
    public condition: string;
    public currentValue: any;
    public message: string;
    public params: Array<any> = [];
    public required: boolean;
    public uid?: string;

    constructor(question: any, group?: any) {
        this.title = question.title;
        this.type = question.type.name || question.type || 'text';
        this.condition = question.condition || ((question.validation || {}).condition || {}).type || '';
        this.currentValue = FieldValidation.readValue(question, group);
        this.params = question.params || [];
        this.message = question.message || ((question.validation || {}).condition || {}).message || '';
        this.required = question.required || ((question.validation || {}).required || {}).enable || question.key || false
    }

    // `group` is optional, and 0/''/false are legal values — so probe each source
    // for presence instead of chaining `||`.
    private static readValue(question: any, group?: any) {
        if (question.currentValue !== undefined && question.currentValue !== null) {
            return question.currentValue;
        }
        if (group && group[question.uid] !== undefined) {
            return group[question.uid];
        }
        if (group && group.controls && group.controls[question.uid]) {
            return group.controls[question.uid].value;
        }
        return '';
    }

    setParams(value: any) {
        if (value || value == 0) {
            this.params.push(value);
        }
    }

    setInput(value) {
        this.currentValue = value
    }

}