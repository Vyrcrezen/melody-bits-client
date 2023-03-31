import React from "react";
import { VyDropdown } from "../../shared/presentational/VyDropdown";
import { LoginDropdown } from "../../auth/container/loginDropdown";
import { UserDropdown } from "../container/userDropdown";
import { defaultLangData } from "../../../context/langContext";

export function NavUserItem({langNav, username}: {langNav: typeof defaultLangData.nav, username?: string}) {
    return (
        <>
            {
                !username ? <VyDropdown btnText={langNav.login} btnOptions={{ boldFont: true, border: false, moreClassNames: 'fs-5', skipBtnClass: true }} dropdownOptions={{ content: LoginDropdown(), menuPosition: 'dropdown-menu-end' }} /> : null
            }
            {
                (username) ? <VyDropdown btnText={username}  btnOptions={{ boldFont: true, border: false, moreClassNames: 'fs-5', skipBtnClass: true }} dropdownOptions={{ content: UserDropdown(), menuPosition: 'dropdown-menu-end' }} /> : null
            }
        </>
    );
}
