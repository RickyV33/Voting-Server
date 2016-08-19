import { List } from 'immutable';

export default function setEntries (state, entries) {
  return state.set('entries', new List(entries));
}
