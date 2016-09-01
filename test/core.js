'use strict';

import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import { setEntries, next, vote } from '../src/core';

describe('core module', () => {
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

  describe('next function', () => {
    it('takes the next two entries under vote', () => {
      const state = fromJS({
        entries: [ 'Trainspotting', '28 Days Later', 'Sunshine']
      });
      const nextState = next(state);
      expect(nextState).to.equal(fromJS({
        vote: {
          pair: [ 'Trainspotting', '28 Days Later' ]
        },
        entries: ['Sunshine']
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = fromJS({
        vote: {
          pair: [ 'Trainspotting', '28 Days Later' ],
          tally: { 'Trainspotting': 4, '28 Days Later': 2 }
        },
        entries: [ '127 Hours', 'Millions', 'Trainspotting' ]
      });
      const nextState = next(state);
      expect(nextState).to.equal(fromJS({
        vote: {
          pair: [ 'Sunshine', 'Millions' ]
        },
        entries: [ '127 Hours', 'Trainspotting' ]
      }))
    });
  });

  describe('vote function', () => {
    it('creates a tally for the voted entry', () => {
      const state = fromJS({
        vote: {
          pair: [ 'Trainspotting', '28 Days Later' ]
        },
        entries: []
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(fromJS({
        vote: {
          pair: [ 'Trainspotting', '28 Days Later' ],
          tally: { 'Trainspotting': 1 }
        },
        entries: []
      }))
    });

    it ('adds to existing tally for the voted entry', () => {
      const state = fromJS({
        vote: {
          pair: [ 'Trainspotting', '28 Days Later' ],
          tally: { 'Trainspotting': 3, '28 Days Later': 2 }
        },
        entries: []
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(fromJS({
        vote   : {
          pair : [ 'Trainspotting', '28 Days Later' ],
          tally: { 'Trainspotting': 4, '28 Days Later': 2 }
        },
        entries: []
      }));
    });
  });
});
