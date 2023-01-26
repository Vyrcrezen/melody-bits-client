import { ValidationError } from "class-validator";

export interface UnpackedType {
    messages: string[];
    messagesCodes: string[];
    messageTexts: string[];
}

export function unpackValidationError(errorObject: ValidationError[], langInputFeedback: {[prop: string]: string}): UnpackedType {
    let messages: string[] = [];
    let messagesCodes: string[] = [];
    let messageTexts: string[] = [];

    errorObject.forEach(errorItem => {
        if (errorItem.constraints) {
            const constraints = errorItem.constraints;
            const constraintProps = Object.keys(constraints) as Array<keyof typeof constraints>;
    
            constraintProps.forEach(propName => {
                messages.push(constraints[propName]);

                if (constraints[propName].split(';').length >= 2) {
                    messagesCodes.push((constraints[propName].split(';') ?? [])[0]);
                    messageTexts.push((constraints[propName].split(';') ?? [])[1]);
                }
                else {
                    console.error(`Poorly configured error message: ${constraints[propName]}`);
                }
            })
        }
    })

    return {
        messages: messages,
        messagesCodes: messagesCodes,
        messageTexts: messagesCodes.length > 0 ? messagesCodes.map(code => langInputFeedback[code]) : messages
    }
}

export function resolveFeedbackMessage(message: string, langInputFeedback: {[prop: string]: string}) {
    const [code, text] = message.split(';');

    if (!code || !text) {
        console.error(`Poorly configured feedback message: ${message}`);
        return message;
    }

    const resolvedMessage = langInputFeedback[code] ?? text ?? message;
    return resolvedMessage;
}
