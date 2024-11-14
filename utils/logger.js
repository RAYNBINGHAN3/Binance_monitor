class Logger {
    log(message) {
        const timestamp = new Date().toLocaleString('zh-CN');
        console.log(`[${timestamp}] ${message}`);
    }

    error(message, error) {
        const timestamp = new Date().toLocaleString('zh-CN');
        console.error(`[${timestamp}] ${message}`, error);
    }
}

export { Logger };