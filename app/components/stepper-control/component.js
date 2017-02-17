import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';

export default Ember.Component.extend({
  propTypes: {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
    smallStep: PropTypes.number.isRequired,
    largeStep: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  },

  _changeValue(changeType = 'inc', stepType = 'small') {
    const { smallStep, largeStep, onChange, min, max, value } = this.getProperties('smallStep', 'largeStep', 'onChange', 'min', 'max', 'value');

    const changeAmt = stepType === 'small' ? smallStep : largeStep;
    let newVal = value + (changeType === 'inc' ? changeAmt : -changeAmt);

    if (newVal < min) { newVal = min; }
    if (newVal > max) { newVal = max; }

    onChange(newVal);
  },

  actions: {
    smallInc() {
      this._changeValue('inc', 'small');
    },
    largeInc() {
      this._changeValue('inc', 'large');
    },
    smallDec() {
      this._changeValue('dec', 'small');
    },
    largeDec() {
      this._changeValue('dec', 'large');
    },
  },
});
