import { defaultLangData } from "../../context/langContext";

function _getPrefData() {
    try {
        const prefData = localStorage.getItem('vy-user-pref');
        if (prefData) {
            return JSON.parse(prefData) as { [prop: string]: string }
        }
    }
    catch (err) {
    }

    return;
}

export function retrieveLangSetting() {
    const prefData = _getPrefData();

    if (typeof prefData === 'object' && prefData.lang) {
        return prefData.lang;
    }
}

export function setLangSetting(lang: string) {
    localStorage.setItem('vy-user-pref', JSON.stringify({
        lang: lang,
    }))
}

export function getLangData(lang: string) {
    return fetch(`/lang/${lang}/main.json`,
    {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then((data) => {
        return data
    })
    .catch(err => {
        throw(err);
    })
}

export function conditionallyUpdateLangData(
  currentLangData: typeof defaultLangData,
  lang: string,
  setLangData: React.Dispatch<React.SetStateAction<typeof defaultLangData>>
) {
  if (currentLangData.lang !== lang) {
    setLangSetting(lang);

    getLangData(lang)
      .then((data) => {
        setLangData(data);
      })
      .catch((err) => {});
  }
}

export function ehUpdateLangData(
    currentLangData: typeof defaultLangData,
    lang: string,
    setLangData: React.Dispatch<React.SetStateAction<typeof defaultLangData>>
) {
   return () => {
       conditionallyUpdateLangData(currentLangData, lang, setLangData); 
   }
}

export function initLangFromStorage(langData: typeof defaultLangData, setLangData: React.Dispatch<React.SetStateAction<typeof defaultLangData>>) {
        const storedLang = retrieveLangSetting();
        
        if (storedLang) {
            conditionallyUpdateLangData(langData, storedLang, setLangData);
        }
}
