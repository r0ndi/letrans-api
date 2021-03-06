import ObjectKeyValueType from "../../../../types/object-key-value.type";
import AxiosHeaders from "../../../../types/axios-header.type";
import appConfig from "../../../../configs/app.config";
import axios, { AxiosResponse } from "axios";

class GoogleApi {
    private readonly apiUrl: string = "https://google-translate1.p.rapidapi.com/language/translate/v2";

    public translate = async (phrase: string, source: string, target: string): Promise<string | null> => {
        try {
            const response: AxiosResponse = await axios.post(this.apiUrl, {q: phrase, source, target, format: "text"}, this.getHeaders());
            const translations: ObjectKeyValueType<string> = response.data.data.translations[0];

            return translations.translatedText;
        } catch (error) {}

        return null;
    }

    private getHeaders = (): AxiosHeaders => {
        return {
            headers: {
                "accept-encoding": "application/gzip",
                "Authorization": `Bearer ${appConfig.GOOGLE_APPLICATION_CREDENTIALS}`,
                "content-type": "application/json",
            },
        };
    }
}

export default GoogleApi;
