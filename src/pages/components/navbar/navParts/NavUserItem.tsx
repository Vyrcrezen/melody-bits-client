import React from "react";
import { VyDropdownLarge } from "../../base/vyDropdown";
import { LoginDropdown } from "../../complex/loginDropdown";
import { UserDropdown } from "../../complex/userDropdown";
import { defaultLangData } from "../../context/langContext";

export function NavUserItem({langNav, username}: {langNav: typeof defaultLangData.nav, username?: string}) {
    return (
        <>
            {
                !username ? <VyDropdownLarge btnText={langNav.login} dropdownContent={LoginDropdown()} /> : null
            }
            {
                (username) ? <VyDropdownLarge btnText={username} dropdownContent={UserDropdown()} /> : null
            }
        </>
    );
}
