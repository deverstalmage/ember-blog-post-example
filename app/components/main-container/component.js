import Ember from 'ember';

const {
  A,
  Component,
  computed,
} = Ember;

export default Component.extend({

  playing: false,

  oscillatorTypes: A([
    'sine',
    'square',
    'sawtooth',
    'triangle',
  ]),

  oscillatorFrequency: 500,

  oscillatorType: computed(function() {
    return this.get('oscillatorTypes.firstObject');
  }),


  audioContext: computed(function() {
    return new AudioContext();
  }),

  oscillator: computed(function() {
    return this.generateOscillator();
  }),

  generateOscillator() {
    const audioContext = this.get('audioContext');
    const oscillator = this.get('audioContext').createOscillator();

    oscillator.type = this.get('oscillatorType');
    oscillator.frequency.value = this.get('oscillatorFrequency');
    oscillator.connect(audioContext.destination);

    return oscillator;
  },

  startOscillator() {
    this.set('oscillator', this.generateOscillator());
    this.get('oscillator').start();
    this.set('playing', true);
  },

  stopOscillator() {
    this.get('oscillator').stop();
    this.set('playing', false);
  },

  updateOscillator() {
    const oscillator = this.get('oscillator');
    oscillator.frequency.value = this.get('oscillatorFrequency');
    oscillator.type = this.get('oscillatorType');
  },

  actions: {
    changeFrequency(newFreq) {
      this.set('oscillatorFrequency', newFreq);
      this.updateOscillator();
    },

    changeType(newType) {
      if (this.get('oscillatorTypes').includes(newType)) {
        this.set('oscillatorType', newType);
      }

      this.updateOscillator();
    },

    play() {
      this.startOscillator();
    },

    stop() {
      this.stopOscillator();
    },
  },

});
