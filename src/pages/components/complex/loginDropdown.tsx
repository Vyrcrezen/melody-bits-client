import React, { useContext, useState } from "react";
import { sitemap } from "../../../sitemap";
import { vyLogin } from "../../../util/functionalities/login";
import { setAuthData } from "../../../util/functionalities/opAuthData";
import { setFlashEmail } from "../../../util/functionalities/opFlashStore";
import { VyBtnLarge } from "../base/vyClickable";
import { VySimpleInputLarge } from "../base/vyTextInput";
import { defaultLangData, LangDataContext } from "../context/langContext";
import _ from 'lodash';

const reqLogin = (email: string, password: string) => {
    vyLogin(email, password)
    .then(result => {
        setAuthData(result);
        window.location.reload();
    })
    .catch(() => {
        setFlashEmail(email);
        window.location.href = sitemap.login;
    })
}

export function LoginDropdown() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {nav: { anonUser: langAnon }} = _.merge({}, defaultLangData, useContext(LangDataContext));

    return (
        <div className="vy-bg-primary border border-top-0 p-3 vy-border-dark">
            <div className="vy-bg-secondary rounded pt-3">
                <div className="px-3">
                    <VySimpleInputLarge inputName="email" inputLabel={langAnon.email} inputSetter={setEmail} />
                    <VySimpleInputLarge inputName="password" inputLabel={langAnon.password} inputSetter={setPassword} />
                </div>
                <div className="text-center mt-2 py-2">
                    <VyBtnLarge btnText={langAnon.login} onClick={() => {reqLogin(email, password)}} />
                    <br className="my-2" />
                    <VyBtnLarge btnText={langAnon.register} onClick={() => {
                        setFlashEmail(email);
                        window.location.href = sitemap.register;
                    }} />
                </div>
            </div>
        </div>
    );

}
