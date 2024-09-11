let audioPlayer = document.getElementById('audio');
let languageSelect = document.getElementById('languageSelect');
let voiceSelect = document.getElementById('voiceSelect');
let speechRateInput = document.getElementById('speechRate');
let pitchInput = document.getElementById('pitch');
let synthesisUtterance = null;

window.onload = function() {
    // Load user preferences from browser storage
    loadUserPreferences();
    // Load available voices when the page is loaded
    populateVoices();
};

async function populateVoices() {
    const voices = await window.speechSynthesis.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = voice.name + ' (' + voice.lang + ')';
        voiceSelect.appendChild(option);
    });
}

function convertTextToSpeech() {
    const text = document.getElementById('inputText').value;
    const language = languageSelect.value;
    const voiceName = voiceSelect.value;
    const speechRate = parseFloat(speechRateInput.value);
    const pitch = parseFloat(pitchInput.value);
    
    synthesisUtterance = new SpeechSynthesisUtterance(text);
    synthesisUtterance.lang = language;
    synthesisUtterance.voice = window.speechSynthesis.getVoices().find(voice => voice.name === voiceName);
    synthesisUtterance.rate = speechRate;
    synthesisUtterance.pitch = pitch;
    window.speechSynthesis.speak(synthesisUtterance);
    saveUserPreferences();
}

function pausePlayback() {
    if (synthesisUtterance) {
        window.speechSynthesis.pause();
    }
}

function resumePlayback() {
    if (synthesisUtterance) {
        window.speechSynthesis.resume();
    }
}

function stopPlayback() {
    if (synthesisUtterance) {
        window.speechSynthesis.cancel();
    }
}

// Speech Recognition Functionality

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = function() {
    console.log('Speech recognition started');
}

recognition.onresult = function(event) {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            const finalTranscript = event.results[i][0].transcript;
            document.getElementById('inputText').value += finalTranscript;
        } else {
            interimTranscript += event.results[i][0].transcript;
        }
    }
}


recognition.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
}

recognition.onend = function() {
    console.log('Speech recognition ended');
}

function startSpeechRecognition() {
    recognition.start();
    saveUserPreferences();
}

function stopSpeechRecognition() {
    recognition.stop();
}



function loadUserPreferences() {
    const preferences = JSON.parse(localStorage.getItem('userPreferences'));
    if (preferences) {
        document.getElementById('languageSelect').value = preferences.language || 'en-US';
        document.getElementById('voiceSelect').value = preferences.voice || '';
        document.getElementById('speechRate').value = preferences.speechRate || 1;
        document.getElementById('pitch').value = preferences.pitch || 1;
    }
}

function saveUserPreferences() {
    const preferences = {
        language: document.getElementById('languageSelect').value,
        voice: document.getElementById('voiceSelect').value,
        speechRate: parseFloat(document.getElementById('speechRate').value),
        pitch: parseFloat(document.getElementById('pitch').value)
    };
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
}
