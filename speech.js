
const textDisplay = document.getElementById('overlay');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();



recognition.lang = 'en-US';


recognition.interimResults = true;
recognition.continuous = true;

recognition.onresult = function(event) {
    const transcript = event.results[event.results.length - 1][0].transcript;
    textDisplay.textContent = transcript;
};


recognition.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
};




// phrase rules
const responses = [
  {
    phrases: [
      "can i be helped or am i too far gone",
      "am i too far gone",
      "can i be helped"
    ],
    reply: "You're not too far gone. It's okay to ask for help, and I'm glad you did. Bananas are always the solution."
  },
  {
    phrases: [
      "what do i do if i am sad",
      "i am sad",
      
    ],
    reply: "OOH OOH AH AH. Eat banana."
  },
  {
    phrases: [
      "how can i live my best life",
      "i want to live my best life"
    ],
    reply: "Swing everywhere you go. It makes me happy."
  },
  {
    phrases: [
      "what are some good habits that i should take up",
      "good habits i should take"
    ],
    reply: "Eat bugs off of your friend's backs and go climb trees. It is good for the brain."
  }
];

// Helper function: lowercase and remove punctuation
function cleanText(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, "").trim();
}

// Start speech recognition on button click
startBtn.addEventListener('click', () => {
  recognition.start();
  console.log("Speech recognition started");
});

// Runs every time speech is detected
recognition.onresult = function (event) {
  const transcript =
    event.results[event.results.length - 1][0].transcript;

  const lowerTranscript = cleanText(transcript);

  let matched = false;

  for (const rule of responses) {
    if (rule.phrases.some(phrase => lowerTranscript.includes(cleanText(phrase)))) {
      textDisplay.textContent = rule.reply;

      // Monkey reply color
      textDisplay.style.color = "orange";

      matched = true;
      break;
    }
  }

  // Default behavior if no phrase matched
  if (!matched) {
    textDisplay.textContent = transcript;

    // Reset to default color
    textDisplay.style.color = "black";
  }
};

