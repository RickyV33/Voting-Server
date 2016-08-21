'use strict';

import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import { setEntries, next } from '../src/core';

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
        entries: ['Sunshine' ]}));
    });
  });

  describe('vote function', () => {
    it('creates a tally for the voted entry', () => {
      const state = new Map({
        vote: new Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: new List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(new Map({
        vote: new Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: new Map({
            'Trainspotting': 1
          })
        }),
        entries: new List()
      }));
    });

    it ('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: new Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: new Map({
            'Trainspotting': 3,
            '28 Days Later': 2
          })
        }),
        entries: new List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(fromJS(`{ vote: { pair: 'Trainspotting', '28 Days later', tally: { Trainspotting': 4, 
      '28 Days Later'}}, entries: []`));
    });
  });
});
