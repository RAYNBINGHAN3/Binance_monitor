class MonitorService {
    constructor(binanceService, telegramService, logger) {
        this.binanceService = binanceService;
        this.telegramService = telegramService;
        this.logger = logger;
        this.interval = process.env.MONITOR_INTERVAL || 5000;
    }

    async checkNewArticles() {
        try {
            const articles = await this.binanceService.fetchArticles();
            
            for (const article of articles) {
                if (this.binanceService.isValidArticle(article)) {
                    await this.telegramService.sendNotification(article.title);
                    this.binanceService.processedArticles.add(article.id);
                }
            }
        } catch (error) {
            this.logger.error('检查新公告时出错:', error.message);
        }
    }

    async startMonitoring() {
        try {
            await this.binanceService.initialize();
            
            setInterval(async () => {
                await this.checkNewArticles();
            }, this.interval);

            this.logger.log(`监控服务已启动，监控间隔: ${this.interval}ms`);
        } catch (error) {
            this.logger.error('启动监控服务失败:', error.message);
            throw error;
        }
    }
}

export { MonitorService };