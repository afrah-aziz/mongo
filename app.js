const express = require("express");
const cors = require("cors");
const collection = require("./mongo");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {
  // You can modify or remove this route if not needed
});



app.post("/", async (req, res) => {
  const { msg } = req.body;
  const data = {
    msg: msg,
  };

  await collection.insertMany([data]);
  res.sendStatus(201);
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await collection.find().toArray();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages." });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

// async function fetchMessages() {
//   try {
//     const response = await fetch('http://localhost:8000/messages');
//     const messages = await response.json();

//     const messageUl = document.getElementById('messageUl');
//     messageUl.innerHTML = ''; // Clear existing messages

//     messages.forEach(message => {
//       const messageLi = document.createElement('li');
//       messageLi.textContent = message.msg;
//       messageUl.appendChild(messageLi);
//     });
//   } catch (error) {
//     console.error('Failed to fetch messages:', error);
//   }
// }

//   document.getElementById('myForm').addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const msgInput = document.getElementById('msgInput').value;

//   // Send data to the backend API endpoint
//   await fetch('http://localhost:8000', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ msg: msgInput }),
//   });

//   // Clear the input field
//   document.getElementById('msgInput').value = '';

//   // Fetch and update message list
//   fetchMessages();
// });

// // Initial fetch to populate the message list
// fetchMessages();