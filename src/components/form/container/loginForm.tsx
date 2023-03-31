import React, { FormEvent, useContext, useRef, useState } from "react";
import _ from 'lodash';

import { getFlashEmail } from "../../../util/functionalities/opFlashStore";
import { vyLogin } from "../../../util/functionalities/login";
import { setAuthData } from "../../../util/functionalities/opAuthData";
import { VyInputLarge } from "../../shared/container/vyTextInput";
import { VyFeedbackBtn } from "../../shared/container/vyFeedbackElements";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { validateUserEmail, validateUserPassword } from "../../../util/validate/userInfo";
import { resolveFeedbackMessage } from "../../../util/validate/unpackValidationError";
import { LangDataContext, defaultLangData } from "../../../context/langContext";
import { sitemap } from "../../../sitemap";

export function LoginForm() {
    const formElement = useRef<HTMLFormElement>(null)

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [inputResult, setInputResult] = useState<{ isError: boolean, message: string }>();

    const flashEmail = getFlashEmail();

    const { loginForm: langLogin, inputFeedback: langInputFeedback } = _.merge({}, defaultLangData, useContext(LangDataContext));

    const loginSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (email && password) {
            vyLogin(email, password)
            .then((result) => {
                setInputResult({
                    isError: false,
                    message: resolveFeedbackMessage('AC_010;Login successful!', langInputFeedback)
                });
                setAuthData(result);
                setTimeout(() => {
                    window.location.href = sitemap.home;
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

    return (
        <div className="container d-flex flex-column mt-4">
            <div className="m-auto p-3 vy-primary-bg vy-lone-backdrop">
                <h5 className="text-decoration-underline">{langLogin.login}:</h5>
                    <form ref={formElement} className="d-flex w-100 flex-column justify-content-center align-items-center p-2 pb-2 rounded vy-bg-secondary vy-dark" method="post" onSubmit={loginSubmit}>
                        <VyInputLarge inputLabel={langLogin.email} inputName="email" frameWidthClass="w-100" inputSetter={setEmail} inputValue={( flashEmail ? flashEmail.email : email )} isRequired={true} validateInput={validateUserEmail} />
                        <VyInputLarge inputLabel={langLogin.password} inputName="password" frameWidthClass="w-100" inputSetter={setPassword} inputValue={password} isRequired={true} validateInput={validateUserPassword} />
                        <VyFeedbackBtn btnText={langLogin.loginBtn} frameOptions={{message: inputResult?.message, isError: inputResult?.isError, moreClasses: 'w-100'}} onClick={() => {
                            validateUserEmail(email)
                            .then(result => {
                                if (result.length > 0) {
                                    setInputResult({ isError: true, message: resolveFeedbackMessage('AC_011;Please verify the input fields', langInputFeedback)});
                                }
                                return validateUserPassword(password);
                            })
                            .then(result => {
                                if (result.length > 0) {
                                    setInputResult({ isError: true, message: resolveFeedbackMessage('AC_011;Please verify the input fields', langInputFeedback) });
                                }
                                else {
                                    setInputResult(undefined);
                                    formElement.current?.requestSubmit();
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });                         
                        }} />
                    </form>
            </div>
        </div>
    );
}