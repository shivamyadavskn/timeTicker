let timers = [];

function startNewTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please enter a valid time.');
        return;
    }

    const totalTime = hours * 3600 + minutes * 60 + seconds;
    const timerElement = document.createElement('div');
    timerElement.className = 'timer';

    const timerId = setInterval(() => {
        if (totalTime > 0) {
            totalTime--;
            updateTimerDisplay(timerElement, totalTime);
        } else {
            clearInterval(timerId);
            timerElement.classList.add('timer-ended');
            playAudioAlert();
        }
    }, 1000);

    const stopButton = document.createElement('button');
    stopButton.innerText = 'Stop Timer';
    stopButton.onclick = () => stopTimer(timerId, timerElement);

    timerElement.appendChild(document.createTextNode(formatTime(totalTime)));
    timerElement.appendChild(stopButton);

    document.getElementById('active-timers').appendChild(timerElement);

    timers.push({ id: timerId, element: timerElement });
}

function stopTimer(timerId, timerElement) {
    clearInterval(timerId);
    timerElement.remove();

    timers = timers.filter(timer => timer.id !== timerId);
}

function updateTimerDisplay(timerElement, remainingTime) {
    timerElement.firstChild.nodeValue = formatTime(remainingTime);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function playAudioAlert() {
    // Add code to play audio alert
    // For example: const audio = new Audio('alert.mp3'); audio.play();
}
