class Timer {
  intervalId;

  constructor() {
   this.startTime = Date.now();
   this.timerElement = document.getElementById("timer");
   this.isRunning = false;
  }

  startTimer() {
   if (this.isRunning) {
     this.stopTimer();
   }
   this.startTime = Date.now();
   this.intervalId = setInterval(() => {
    this.displayTime();
   }, 100);
   this.isRunning = true;
 }
  stopTimer() {
   clearInterval(this.intervalId);
  }
  getTime() {
   const seconds = Math.round((Date.now() - this.startTime) / 1000)
   if (seconds < 3600) {
     return new Date(seconds * 1000).toISOString().slice(14, 19);
   } else {
     return new Date(seconds * 1000).toISOString().slice(11, 19);
   }
  }
  displayTime() {
    this.timerElement.innerHTML = this.getTime();
  }
};

export const timer = new Timer();
