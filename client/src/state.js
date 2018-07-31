import { store } from 'react-easy-state'

class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject)=> {
      this.reject = reject
      this.resolve = resolve
    })
  }
}

class AudioQueue {
  constructor(file) {
    this.file = file;
    this.player = new Audio(file);
    this.queue = [];
    this.track = 0;
    this.player.addEventListener('ended', (e) => {
      this.track++;
      if (this.queue.length > this.track) {
        this.player.src = this.queue[this.track];
        this.play();
      } else {
        this.track = 0;
        this.queueCompletionPromise.resolve();
      }
    });
    this.queueCompletionPromise = new Deferred();
  }

  set src(file) {
    this.queue = [file];
    this.player.src = file;
  }

  get src() {
    return this.player.src;
  }

  set currentTime(time) {
    this.player.currentTime = time;
  }

  get currentTime() {
    return this.player.currentTime;
  }

  get duration() {
    return this.player.duration;
  }

  get paused() {
    return this.player.paused;
  }

  get readyState() {
    return this.player.readyState;
  }

  play() {
    if (!this.src) {
      this.track = 0;
      this.player.src = this.queue[this.track];
    }
    return this.player.play();
  }

  pause() {
    return this.player.pause();
  }

  enqueue(files) {
    this.queue = [...files];
    this.queueCompletionPromise = new Deferred();
    if (this.paused) {
      this.track = 0;
      this.player.src = this.queue[0];
    }
    return this.queueCompletionPromise.promise;
  }

  load() {
    return this.player.load();
  }

  addEventListener(event, listener) {
    return this.player.addEventListener(event, listener);
  }

  removeEventListener(event, listener) {  
    return this.player.removeEventListener(event, listener);
  }
}

const state =  store({
  journey: null,
  sessionId: null,
  journeys: [],
  joinableJourneys: [],
  loggedIn: false,
  user: null,
  location: '/',
  audioTag: __CLIENT__ ? new AudioQueue('/journeys/Journey to The Magnetic Field of the Earth+Music.mp3') : null,
  ...(global.__INITIAL_STATE__ || {})
});

export default state;
