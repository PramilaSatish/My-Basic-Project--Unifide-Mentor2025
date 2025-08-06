const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('messageInput');

// Send Message Function
function sendMessage() {
  const messageText = messageInput.value.trim();

  if (messageText === '') return;

  // Create message element
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'sent');
  messageElement.innerText = messageText;

  // Append message to chat
  chatMessages.appendChild(messageElement);

  // Clear input field
  messageInput.value = '';

  // Scroll to the bottom of chat
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Simulate receiving a reply
  setTimeout(receiveMessage, 1000);
}

function receiveMessage() {
  const replyText = 'Hello! How can I help you?';

  // Create received message element
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'received');
  messageElement.innerText = replyText;

  // Append message to chat
  chatMessages.appendChild(messageElement);

  // Scroll to the bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
