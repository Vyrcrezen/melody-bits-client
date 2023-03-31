
const reroutTraffic = () => {
    const body = document.querySelector('body');

    if (!body) {
        return;
    }

    console.log(window.location.href);
    const pageAddress = window.location.href.replace( /(.*?\/\/)*(.*?\/){1}/, '');
    const scriptedContent = document.createElement('script');

    console.log(pageAddress);

    if (pageAddress.includes('profile-')) {
        scriptedContent.setAttribute('src', '/profileOverviewPage.js');
    }
    else if (pageAddress.includes('submissions-')) {
        scriptedContent.setAttribute('src', '/profileSubmissionsPage.js');
    }
    else if(pageAddress.includes('music-edit-')) {
        scriptedContent.setAttribute('src', '/musicEditPage.js');
    }
    else if(pageAddress.includes('music-browser')) {
        scriptedContent.setAttribute('src', '/musicBrowserPage.js')
    }
    else {
        switch (pageAddress) {
            case 'index': scriptedContent.setAttribute('src', '/indexpage.js');
            break;
            case 'about': scriptedContent.setAttribute('src', '/aboutPage.js');
            break;
            case 'login': scriptedContent.setAttribute('src', '/loginPage.js');
            break;
            // case 'music-browser': scriptedContent.setAttribute('src', '/musicBrowserPage.js');
            // break;
            case 'music-approve': scriptedContent.setAttribute('src', '/musicApprovePage.js');
            break;
            case 'register': scriptedContent.setAttribute('src', '/RegisterPage.js');
            break;
            case 'music-upload': scriptedContent.setAttribute('src', '/musicUploadPage.js');
            break;
            case 'privacy-policy': scriptedContent.setAttribute('src', '/privacyPolicyPage.js');
            break;
            case 'terms-and-rules': scriptedContent.setAttribute('src', '/termsAndRulesPage.js');
            break;
            default: scriptedContent.setAttribute('src', '/notFound.js');
        }
    }


    body.appendChild(scriptedContent);
    
}

reroutTraffic();