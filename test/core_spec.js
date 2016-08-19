import { List, Map } from 'immutable';
import { expect } from 'chai';

import { setEntries } from '../src/core';

describe('application logic', () => {
  describe('setEntries function', () => {
    it('adds the entries to the state', () => {
      const state = new Map();
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(new Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });
  });
});
