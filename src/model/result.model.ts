export interface ValidationResult {
    result: boolean;
    message: string;
}

// Keyed by condition name, plus 'required' for the empty-value case.
export interface MessageOverrides {
    [condition: string]: (question: any, params: Array<any>) => string;
}

export class Messages {

    private static overrides: MessageOverrides = {};

    // Replaces the generated message for the given conditions. A field's own
    // `message` still wins — this only changes the library's fallback wording.
    static setMessages(overrides: MessageOverrides) {
        Messages.overrides = Object.assign({}, Messages.overrides, overrides || {});
    }

    static reset() {
        Messages.overrides = {};
    }

    static apply(condition: string, question: any, params: Array<any>, generated: ValidationResult): ValidationResult {
        const override = Messages.overrides[condition];
        if (!override || (question || <any>{}).message) {
            return generated;
        }
        return { result: generated.result, message: override(question, params || []) };
    }
}
