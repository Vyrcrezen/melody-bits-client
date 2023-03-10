import { createContext } from "react";

export const defaultLangData = {
    "lang": "en",
    "numPostfix": {
        "deka": "n/u",
        "hecto": "n/u",
        "kilo": "k",
        "mega": "million"
    },
    "nav": {
        "home": "Home",
        "browse": "Browse",
        "upload": "Upload",
        "approve": "Approve",
        "discussions": "Discussions",
        "login": "Login",

        "anonUser": {
            "email": "E-mail",
            "password": "Pasword",
            "login": "Login",
            "register": "Register"
        },

        "loggedUser": {
            "profile": "Profile",
            "submissions": "Submissions",
            "messages": "Messages",
            "favorites": "Favorites",
            "logout": "Logout"
        }
    },
    "loginForm": {
        "login": "Login",
        "email": "E-mail address",
        "password": "Password",
        "loginBtn": "Login"
    },
    "registerForm": {
        "username": "Username",
        "register": "Register",
        "email": "E-mail address",
        "password": "Password",
        "rePassword": "Password again",
        "registerBtn": "Register"
    },
    "musicUploadForm": {
        "selectImageBtn": "Select Image",
        "selectMusicBtn": "Select Music",
        "title": "Title",
        "link": "Link",
        "artist": "Artist",
        "tags": "Tags",
        "album": "Album",
        "recordLabel": "Record Label",
        "publisher": "Publisher",
        "uploadMusicBtn": "Uploac Music"
    },
    "musicCard": {
        "menu": {
            "overview": "Overview",
            "details": "Details",
            "comments": "Comments",
            "report": "Report",
            "edit": "Edit",
            "delete": "Delete"
        },
        "plays": "plays",
        "comments": "Comments",

        "uploader": "Uploader",
        "title": "Title",
        "artist": "Artist",
        "label": "Record Label",
        "publisher": "Publisher",
        "source": "Source",
        "uploaded": "Uploaded",
        "approver": "Approver",
        "tagList": "Tag List"
    },
    "musicFilter": {
        "orderBy": "Order by",
        "title": "Title",
        "rating": "Rating",
        "uploadTime": "Upload time",
        "plays": "Plays",
        "uploader": "Uploader",

        "filter": "Filter",
        "favorites": "Favorites",
        "titlePlaceholder": "Search title...",
        "uploaderPlaceholder": "Search uploader...",
        "uploaded": "Uploaded",
        "tags": "Tags"

    },
    "profile": {
        "nav_menu": {
            "navigation": "Navigation",
            "account": "Account",
            "messages": "Messages",
            "preferences": "Preferences",
            "submissions": "Submissions",
            "favorites": "Favorites",
            "comments": "Comments",
            "discussions": "Discussions",
            "moderator": "Moderator"
        },
        "overview": {
            "username": "Username",
            "email": "E-mail address",
            "editBtn": "Edit",
            "saveBtn": "Save",
            "cancelBtn": "Cancel",
            "id": "id",
            "hashId": "Hash id",
            "registrationDate": "Registration date",
            "lastOnline": "Last online",
            "clearance": "Clearance level",
            "comments": "Comments",
            "uploads": "Uploads",
            "favorites": "Favorites",
            "userBio": "User bio"
        }
    },
    "inputFeedback": {
        "AC_000": "Please provide a valid e-mail address",
        "AC_001": "Password must be between 8 and 64 characters long.",
        "AC_002": "Username must be between 2 and 20 characters long.",
        "AC_003": "Username must contain only letters and numbers",
        "AC_004": "The two passwords must match",
        "AC_005": "Bio text must be between 2 and 1200 characters long.",

        "AC_010": "Login successful!",
        "AC_011": "Please verify the input fields",
        "AC_012": "Registration successful. You can login now",

        "MD_001": "Music title must be between 2 and 128 characters long.",
        "MD_002": "Link must be a valid web address, linking to the original source of the music.",
        "MD_003": "Artist name must be between 2 and 128 characters long.",
        "MD_004": "Album name must be between 2 and 128 characters long.",
        "MD_005": "Record Label name must be between 2 and 128 characters long.",
        "MD_006": "Publisher name must be between 2 and 128 characters long.",
        "MD_007": "Each tag must be between 2 and 20 characters long.",
        "MD_008": "Please provide at least 2 tags - separated by semicolon ( ; ) - that you think describe this music well.",
        "MD_009": "Image must be in jpg, png or webp format.",
        "MD_010": "Music must be in mp3 format.",

        "MD_020": "Music upload successful!",

        "MD_033": "Music rating successfully added!",
        "MD_034": "Music rating successfully updated!",
        "MD_035": "Music rating successfully removed!"
    }
}

export const LangContext = createContext('en');

export const LangDataContext = createContext(defaultLangData)
