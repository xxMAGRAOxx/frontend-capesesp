export class LanguageService {
    languageCode = 'pt-BR';

    getLanguage() {
        return this.languageCode;
    }

    setLanguage(code) {
        this.languageCode = code;
    }
}
