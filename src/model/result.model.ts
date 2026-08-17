export interface ValidationResult {
    result: boolean;
    message: string;
    /** Stable key for the failure, e.g. GTE_ERROR, REQUIRED_ERROR. Empty when valid. */
    code?: string;
}

export interface ConfigProblem {
    code: string;
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
        const code = generated.result ? '' : ((question || <any>{}).code || Messages.toCode(condition));
        const override = Messages.overrides[condition];
        const message = (override && !(question || <any>{}).message)
            ? override(question, params || [])
            : generated.message;
        return { result: generated.result, message: message, code: code };
    }

    // gte -> GTE_ERROR, notBetween -> NOT_BETWEEN_ERROR
    static toCode(condition: string) {
        if (!condition) {
            return 'INVALID_ERROR';
        }
        return condition.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase() + '_ERROR';
    }
}
