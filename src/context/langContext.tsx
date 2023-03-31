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
        "character": "Character",
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
        "uploadMusicBtn": "Upload Music",
        "editMusicBtn": "Save Changes"
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
    "index": {
        "highlights": "Highlights",
        "changes": "Changes",
        "latestAdditions": "Latest Additions",
        
        "carousel": {
            "next": "Next",
            "previous": "Previous",

            "langSlide": {
                "title": "Available in many languages",
                "description": "Our music sharing website is designed to be accessible to people from all over the world. It is now accessible in German, English, Spanish, Hungarian and Japanese!"
            },
            "mobileSlide": {
                "title": "Optimized for mobile and desktop",
                "description": "Whether you're on your phone or your computer, you'll have an easy and enjoyable experience navigating our website and discovering new music."
            },
            "uploadeSlide": {
                "title": "Upload and share music",
                "description": "Our music sharing website allows you to upload and share your own music with the world. Whether you're a musician looking to share your original compositions, or simply want to showcase some of your favorite tracks, our platform makes it easy for you to get your music out there."
            },
            "favoriteSlide": {
                "title": "Rate and keep track of your favorite music",
                "description": "With our rating and tracking system, you can easily keep track of your favorite songs, and share your recommendations with others."
            },
            "characterSlide": {
                "title": "Now with tabletop character sheet",
                "description": "Our music sharing website now comes with a tabletop character sheet feature! Whether you're a fan of Dungeons and Dragons, Pathfinder, or any other tabletop game, you can now create and customize your own character sheet right on our website."
            }
        }
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
        },
        "submissions": {
            "resolution": "Resolution",
            "approved": "Approved",
            "submitted": "Submitted",
            "revisionNeeded": "Revision Needed",
            "terminated": "Terminated",
            "revise": "Revise",
            "message": "Message"
        }
    },
    "inputFeedback": {
        "AC_000": "Please provide a valid e-mail address",
        "AC_001": "Password must be between 8 and 64 characters long.",
        "AC_002": "Username must be between 2 and 20 characters long.",
        "AC_003": "Username must contain only letters and numbers",
        "AC_004": "The two passwords must match",
        "AC_005": "Bio text must be between 2 and 1200 characters long.",
        "AC_006": "You need to accept the Privacy Policy and the Terms and Rules to register.",

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
        "MD_008": "Please provide at least 2 tags - separated by semicolon ( ; ) - that describes this music well.",
        "MD_009": "Image must be in jpg, png or webp format.",
        "MD_010": "Music must be in mp3 format.",

        "MD_020": "Music upload successful!",

        "MD_033": "Music rating successfully added!",
        "MD_034": "Music rating successfully updated!",
        "MD_035": "Music rating successfully removed!"
    },
    "legal": {
        "musicUploadCopyright": "We only accept content that has been licensed under a creative commons license or a similar license that allows for free use and distribution as long as proper credit is given to the original creators.",
        "musicUploadCopyrightLong": "At Melody Bits, we highly value and respect the importance of copyright laws. We only accept content that has been licensed under a creative commons license or a similar license that allows for free use and distribution as long as proper credit is given to the original creators. This helps us ensure that the content we share is legally sound and aligns with our commitment to promoting creative works in a responsible manner.",
        "musicUploadLink": "Please make sure that the source you provide via the link clearly states the above for the content."
    }
}

export const LangContext = createContext('en');

export const LangDataContext = createContext(defaultLangData)
