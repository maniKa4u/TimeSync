let timerDisplay = document.querySelector('.timeDisplay h1');
let startBtn = document.querySelector('.start');
let stopBtn = document.querySelector('.stop');
let resetBtn = document.querySelector('.reset');
let msec='00';
let sec='00';
let min='00';

let timerId=null;

startBtn.addEventListener('click', function(){
    if (timerId !== null) return; // If timer is running, don't start another
    timerId = setInterval(startTimer, 10);
});

 
stopBtn.addEventListener('click', function(){
    clearInterval(timerId);
    timerId=null;
})

resetBtn.addEventListener('click', function(){
    clearInterval(timerId);
    timerId = null;
    msec = 0;
    sec = 0;
    min = 0;
    timerDisplay.innerHTML = `00:00:00`;
});

function startTimer(){
    msec++;
    if (msec === 100) {
        msec = 0;
        sec++;
        if (sec === 60) {
            sec = 0;
            min++;
        }
    } 

    let msecStr = String(msec).padStart(2, '0');
    let secStr = String(sec).padStart(2, '0');
    let minStr = String(min).padStart(2, '0');


    timerDisplay.textContent = `${minStr}:${secStr}:${msecStr}`;
}

//======================Alarm Clock==============================



// Select elements
const currentTimeDisplay = document.getElementById('current-time');
const alarmTimeInput = document.getElementById('alarm-time');
const setAlarmButton = document.querySelector('.set');
const dayButtons = document.querySelectorAll('.days button');
const alarmTimer = document.querySelector('.alarm-timer');
const alarmImage = document.querySelector('.alarm-timer img');
const alarmText = alarmTimer.querySelector('h2');
const resetButton = document.querySelector('.reset-alarm');

// To store selected alarm details
let alarmDays = []; // Default: all 7 days
let alarmSet = false;
let alarmTime = null;
let snoozeCount = 0;
let snoozeInterval = null;

// Create Snooze and Stop buttons
const snoozeButton = document.createElement('button');
const stopButton = document.createElement('button');
snoozeButton.textContent = 'Snooze';
stopButton.textContent = 'Stop';
snoozeButton.classList.add('snooze');
stopButton.classList.add('stop');
alarmTimer.appendChild(snoozeButton);
alarmTimer.appendChild(stopButton);
snoozeButton.style.display = 'none';
stopButton.style.display = 'none';

// Display current time continuously
function updateCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;

  // Check if it's time for the alarm
  if (alarmSet && `${hours}:${minutes}` === alarmTime) {
    alarmRings();
  }
}
setInterval(updateCurrentTime, 1000);

// Handle day selection
dayButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('selected');
    const dayName = button.textContent;
    if (button.classList.contains('selected')) {
      alarmDays.push(dayName);
      button.style.backgroundColor = '#8b5cf6';
      button.style.color = 'white';
    } else {
      alarmDays = alarmDays.filter((day) => day !== dayName);
      button.style.backgroundColor = ''; // Reset to default
      button.style.color = ''; // Reset to default
    }
  });
});

// Handle alarm set button click
setAlarmButton.addEventListener('click', () => {
  alarmTime = alarmTimeInput.value;
  const selectedDays = alarmDays.length > 0 ? alarmDays : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  alarmSet = true;

  // Update `.alarm-timer` text
  alarmText.textContent = `Alarm set for ${alarmTime} on ${selectedDays.join(', ')}`;

  // Update `.alarm-timer` background and other properties based on time
  const [hours] = alarmTime.split(':').map(Number);
  if (hours >= 5 && hours < 16) {
    // Daytime settings
    alarmTimer.style.background = `linear-gradient(125deg, rgba(227,253,255,1) 0%, rgba(128,224,255,1) 49%, rgba(0,144,190,1) 100%)`;
    alarmText.style.color = ''; // Reset to default color
    alarmImage.src = 'sun.png'; // Daytime icon
  } else {
    // Nighttime settings
    alarmTimer.style.background = `linear-gradient(125deg, rgba(167,179,255,1) 0%, rgba(50,9,173,1) 49%, rgba(77,0,115,1) 100%)`;
    alarmText.style.color = 'white'; // Change font color to white
    alarmImage.src = 'moon1.png'; // Nighttime icon
  }

  // Popup confirmation message
  alert(`Alarm set for ${alarmTime} on ${selectedDays.join(', ')}`);
});

// Alarm ringing behavior
function alarmRings() {
  alarmSet = false; // Stop further checks
  snoozeCount = 0;

  // Show Snooze and Stop buttons
  snoozeButton.style.display = 'inline-block';
  stopButton.style.display = 'inline-block';

  // Play alarm sound
  const alarmSound = document.querySelector('audio');
  alarmSound.play();

  // Handle Snooze button click
  snoozeButton.addEventListener('click', () => {
    if (snoozeCount < 3) {
      snoozeCount++;
      alarmSound.pause(); // Stop alarm sound
      alarmSound.currentTime = 0;

      // Hide buttons temporarily and resume after 10 seconds
      snoozeButton.style.display = 'none';
      stopButton.style.display = 'none';
      snoozeInterval = setTimeout(() => {
        alarmSound.play();
        snoozeButton.style.display = 'inline-block';
        stopButton.style.display = 'inline-block';
      }, 600000);
    } else {
      // Hide buttons after 3 snoozes
      snoozeButton.style.display = 'none';
      stopButton.style.display = 'none';
      clearTimeout(snoozeInterval);
    }
  });

  // Handle Stop button click
  stopButton.addEventListener('click', () => {
    alarmSound.pause();
    alarmSound.currentTime = 0; // Reset sound
    snoozeButton.style.display = 'none';
    stopButton.style.display = 'none';
  });
}


// Function to reset the alarm
resetButton.addEventListener('click', function() {
  // Reset the alarm time input to the default value
  alarmTimeInput.value = "00:00"; // or you can set a specific default time
  
  // Reset the alarm display message
  alarmText.textContent = 'No Alarm Set';
  
  // Reset the alarm background to the default settings (daytime)
  alarmTimer.style.background = `linear-gradient(125deg, rgba(227,253,255,1) 0%, rgba(128,224,255,1) 49%, rgba(0,144,190,1) 100%)`;
  alarmText.style.color = ''; // Reset the font color to default
  alarmImage.src = 'sun.png'; // Reset the icon to the sun

  // Reset the selected days (if any)
  dayButtons.forEach(button => {
    button.style.backgroundColor = ''; // Reset the background color of selected days
    button.style.color = ''; // Reset the text color to default
  });

});

document.querySelectorAll('.container div').forEach((div) => {
  div.addEventListener('click', () => {
      const targetId = div.getAttribute('data-target'); // Get the target section ID
      const targetSection = document.querySelector(targetId); // Select the section
      if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
      }
  });
});
