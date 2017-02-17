import Ember from 'ember';
import { PropTypes } from 'ember-prop-types';

const {
  A,
} = Ember;

export default Ember.Component.extend({
  propTypes: {
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  },

  selected: false,
  onChange: () => {},
  options: A(),

  actions: {
    onChange(id) {
      this.get('onChange')(id);
    },
  },
});
