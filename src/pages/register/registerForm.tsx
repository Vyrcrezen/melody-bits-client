import React, { FormEvent, useContext, useRef, useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import '../../css/style.css';
import { getFlashEmail } from "../../util/functionalities/opFlashStore";
import _ from "lodash";
import { defaultLangData, LangDataContext } from "../components/context/langContext";
import { vyRegister } from "../../util/functionalities/register";
import { resolveFeedbackMessage, unpackValidationError } from "../../util/validate/unpackValidationError";
import { VyCheckboxInput, VyInputLarge } from "../components/base/vyTextInput";
import { VyFeedbackBtn } from "../components/base/vyFeedbackElements";
import { validateUsername, validateUserEmail, validateUserPassword, validateUserRePassword, validateCheckboxChecked } from "../../util/validate/userInfo";
import { sitemap } from "../../sitemap";
import { ValidationError } from "class-validator";

export function RegisterForm() {
    const formElement = useRef<HTMLFormElement>(null)

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [termsAccept, setTermsAccept] = useState<string>('');
    const [inputResult, setInputResult] = useState<{ isError: boolean, message: string }>();

    const flashEmail = getFlashEmail();

    const { registerForm: langRegister, inputFeedback: langInputFeedback } = _.merge({}, defaultLangData, useContext(LangDataContext));

    const registerSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (username && email && password) {
            vyRegister(username, email, password)
            .then((result) => {
                console.log(result);
                setInputResult({
                    isError: false,
                    message: resolveFeedbackMessage('AC_012;Registration successful!', langInputFeedback)
                });
                setTimeout(() => {
                    window.location.href = sitemap.login;
                }, 1000);
            })
            .catch((err: GraphqlRes) => {
                setInputResult({
                    isError: true,
                    message: err.message
                });
            });
        }
    }

    const termsAcceptText = (
        <span>
            I've read and agree to the <a className="vy-link-dr" target='_blank' href={sitemap.privacyPolicy}>Privacy Policy</a> and the <a className="vy-link-dr" target='_blank' href={sitemap.termsAndRules}>Terms and Rules</a>
        </span>
    );

    return (

        <div className="container d-flex flex-column mt-4">
            <div className="m-auto p-3 vy-primary-bg vy-lone-backdrop">
                <h5 className="text-decoration-underline">{langRegister.register}:</h5>
                    <form ref={formElement} className="d-flex w-100 flex-column justify-content-center align-items-center p-2 pb-2 rounded vy-bg-secondary vy-dark" method="post" onSubmit={registerSubmit}>
                        <VyInputLarge inputLabel={langRegister.username} inputName="username" frameWidthClass="w-100" inputSetter={setUsername} inputValue={username} isRequired={true} validateInput={validateUsername} />
                        <VyInputLarge inputLabel={langRegister.email} inputName="email" frameWidthClass="w-100" inputSetter={setEmail} inputValue={( flashEmail ? flashEmail.email : email )} isRequired={true} validateInput={validateUserEmail} />
                        <VyInputLarge inputLabel={langRegister.password} inputName="password" frameWidthClass="w-100" inputSetter={setPassword} inputValue={password} isRequired={true} validateInput={validateUserPassword} />
                        <VyInputLarge inputLabel={langRegister.rePassword} inputName="re-password" frameWidthClass="w-100" inputSetter={setRePassword} inputValue={rePassword} isRequired={true} validateInput={(inputRePswd) => validateUserRePassword(password, inputRePswd)} />
                        <VyCheckboxInput inputLabel={termsAcceptText} inputName="terms-accept" frameWidthClass="w-100" inputSetter={setTermsAccept} inputValue={termsAccept} isRequired={true} validateInput={(termsAccept) => validateCheckboxChecked(termsAccept)} />
                        <VyFeedbackBtn btnText={langRegister.registerBtn} frameOptions={{ message: inputResult?.message, isError: inputResult?.isError, moreClasses: 'w-100'}} onClick={() => {
                            
                            const validationResults: Array<Promise<ValidationError[]>> = [
                                validateUsername(username),
                                validateUserEmail(email),
                                validateUserPassword(password),
                                validateUserRePassword(password, rePassword),
                                validateCheckboxChecked(termsAccept)
                            ];
        
                            Promise.all(validationResults)
                            .then((result) => {
                                console.log(result);
        
                                for (const errorItem of result) {
                                    if ( Array.isArray(errorItem) && errorItem.length > 0) {
                                        const errorMessage = unpackValidationError(errorItem, langInputFeedback).messageTexts.join('\n');
                                        setInputResult({ isError: true, message: errorMessage });
        
                                        throw new Error(errorMessage);
                                    }
                                }
                                setInputResult(undefined);
                                formElement.current?.requestSubmit();
                            })
                            .catch(err => {
                                console.log(err);
                            })
                            
                            // validateUsername(username)
                            // .then((result) => {
                            //     if (result.length > 0) {
                            //         const errorMessage = unpackValidationError(result, langInputFeedback).messageTexts.join('\n');
                            //         setInputResult({ isError: true, message: errorMessage });
                            //         throw new Error(errorMessage);
                            //     }

                            //     return validateUserEmail(email)
                            // })
                            // .then(result => {
                            //     if (result.length > 0) {
                            //         const errorMessage = unpackValidationError(result, langInputFeedback).messageTexts.join('\n');
                            //         setInputResult({ isError: true, message: errorMessage });
                            //         throw new Error(errorMessage);

                            //         // setInputResult({ isError: true, message: resolveFeedbackMessage('AC_011;Please verify the input fields', langInputFeedback)});
                            //     }
                            //     return validateUserPassword(password);
                            // })
                            // .then(result => {
                            //     if (result.length > 0) {
                            //         const errorMessage = unpackValidationError(result, langInputFeedback).messageTexts.join('\n');
                            //         setInputResult({ isError: true, message: errorMessage });
                            //         throw new Error(errorMessage);
                            //     }

                            //     return validateUserRePassword(password, rePassword);
                            // })
                            // .then(result => {
                            //     if (result.length > 0) {
                            //         const errorMessage = unpackValidationError(result, langInputFeedback).messageTexts.join('\n');
                            //         setInputResult({ isError: true, message: errorMessage });
                            //         throw new Error(errorMessage);
                            //     }
                            //     setInputResult(undefined);
                            //     formElement.current?.requestSubmit();
                            // })
                            // .catch(() => {});                         
                        }} />
                    </form>
            </div>
        </div>
    );
}