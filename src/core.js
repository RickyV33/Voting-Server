import { List, Map } from 'immutable';

export function setEntries (state, entries) {
  return state.set('entries', new List(entries));
}

export function next (state) {
  const entries = stage.get('entries');
  return state.merge({
    vote: new Map({ pair: entires.take(2) }),
    entries: entries.skip(2)
  });
}
