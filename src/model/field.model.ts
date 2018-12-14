export class FieldValidation {
    public title: string;
    public type: string;
    public condition: string;
    public currentValue: any;
    public message: string;
    public params: Array<any> = [];
    public uid?:string;

    constructor(question: any, group?: any) {
        this.title = question.title;
        this.type = question.type.name || question.type;
        this.condition = question.condition ||    ((question.validation || {}).condition || {}).type || '';
        this.currentValue = question.currentValue || group[question.uid] || group.controls[question.uid].value;
        this.params = question.params || [];
        this.message = question.message || ((question.validation || {}).condition || {}).message || '';
    }

    setParams(value: any) {
        if (value || value == 0) {
            this.params.push(value);
        }
    }

    setInput(value){
        this.currentValue=value
    }

}