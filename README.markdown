# README

Scrapes the messages in the current Olark conversation and sends the messages to a specified API.
This assumes you have made a backend that responds to `/documents?document=Conversational%20messages%20between%20people`.
Response object should be like the following:

```
[
  {
    url: 'https://olark.com/transcripts/show/123hnth4hobuatmntmaonteush',
    Cosine similarity: 0.345566,
    Conversation: [
      {
        message: 'I need some help',
        author: 'Jenny'
      },
      {
        message: 'Hello, Jenny. Thanks for reaching out.',
        author: 'Edderic'
      },
      {
        message: 'My name is Edderic. How may I help you today?',
        author: 'Edderic'
      },
      {
        message: 'I am not quite sure when my item will arrive...',
        author: 'Jenny'
      },
    ]
  },
  {
    url: 'https://olark.com/transcripts/show/totog1902309hntoeuthsatheu',
    Cosine similarity: 0.123456,
    Conversation: [
      {
        message: 'Hi there',
        author: 'Elizabeth'
      },
      {
        message: 'Hello, Elizabeth. Thanks for reaching out.',
        author: 'Edderic'
      },
      {
        message: 'My name is Edderic. How may I help you today?',
        author: 'Edderic'
      },
      {
        message: 'It seems that this device is broken.',
        author: 'Elizabeth'
      },
    ]
  }
]
```

## Installation

1. Download the folder
2. Open up Google Chrome
3. Visit `chrome://extensions`
4. Hit `Load unpacked extension...` You should see the extension displayed on the top right part of chrome.
5. Select the folder.
6. Visit `https://chat.olark.com`
7. Press on the extension button.
8. Type the URL of the endpoint.
9. Click on the extension button again, and wait for the response from the server.
10. Make sure you have a live conversation with someone, and that there exists at least a message.
11. You should see five of the most relevant chats.
