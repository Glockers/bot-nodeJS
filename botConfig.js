const TelegramBot = require("node-telegram-bot-api")
const token = "2060431577:AAFU6NbPt4FbMitgk5ijIGB8mFVKqasmSvA"

const bot = new TelegramBot(token, {polling: true})

module.exports.bot = bot;