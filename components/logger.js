function logger(message, type) {
    const date = new Date();
    const formattedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()} ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

    const logMessage = `[${formattedDate}] [${type}] ${message}`;

    if (type === "Error") {
        console.error(logMessage);
    } else if (type === "Info"){
        console.info(logMessage);
    } else {
        console.log(logMessage);
    }
}

module.exports = logger;