import { articles_url, _api_key, category, country_code } from '../config/api_config';

export default async function getArticles() {

    try {
        let articles = await fetch(`${articles_url}?country=${country_code}&category=${category}`, {
            headers: {
                'X-API-KEY': _api_key
            }
        });

        let result = await articles.json({limit: '50mb'});
        articles = null;

        return result.articles;
    }
    catch(error) {
        throw error;
    }
}