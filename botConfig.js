require('dotenv').config()
const TelegramBot = require("node-telegram-bot-api")




const bot = new TelegramBot(process.env.TOKEN_TELEGRAM_BOT, {polling: true})

module.exports.bot = bot;