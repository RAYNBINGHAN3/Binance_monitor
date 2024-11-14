import axios from 'axios';

class BinanceService {
    constructor(logger) {
        this.logger = logger;
        this.apiUrl = 'https://www.binance.com/bapi/composite/v1/public/cms/article/list/query';
        this.processedArticles = new Set();
    }

    async fetchArticles() {
        try {
            const response = await axios.get(this.apiUrl, {
                params: {
                    type: 1,
                    catalogId: 48,
                    pageNo: 1,
                    pageSize: 20
                }
            });

            if (response.data.code === '000000' && response.data.data) {
                return response.data.data.catalogs[0].articles;
            }
            return [];
        } catch (error) {
            this.logger.error('获取币安公告失败:', error.message);
            return [];
        }
    }

    isValidArticle(article) {
        const keywords = ['Launch', 'Add', 'List'];
        return (
            !this.processedArticles.has(article.id) &&
            keywords.some(keyword => article.title.includes(keyword))
        );
    }

    async initialize() {
        try {
            const articles = await this.fetchArticles();
            articles.forEach(article => {
                this.processedArticles.add(article.id);
            });
            this.logger.log('初始化完成，已记录现有公告');
        } catch (error) {
            this.logger.error('初始化失败:', error.message);
            throw error;
        }
    }
}

export { BinanceService };