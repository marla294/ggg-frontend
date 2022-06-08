import groupArrayBy from '../lib/groupArrayBy';

const testIngredientsArray = [
  {
    id: '12345',
    name: 'banana',
    store: 'whole foods',
    aisle: 'produce',
    homeArea: 'kitchen',
  },
  {
    id: '11111',
    name: 'apple',
    store: 'whole foods',
    aisle: 'produce',
    homeArea: 'kitchen',
  },
  {
    id: '22222',
    name: 'cliff bars',
    store: 'whole foods',
    aisle: 'snacks',
    homeArea: 'pantry',
  },
];

describe('groupArrayBy function', () => {
  it('produces the correct number of groups', () => {
    expect(groupArrayBy(testIngredientsArray, 'store').length).toEqual(1);
    expect(groupArrayBy(testIngredientsArray, 'aisle').length).toEqual(2);
    expect(groupArrayBy(testIngredientsArray, 'homeArea').length).toEqual(2);
  });
  it('sorts the grouped array alphabetically', () => {
    expect(groupArrayBy(testIngredientsArray, 'name')[0][0]).toBe('apple');
    expect(groupArrayBy(testIngredientsArray, 'name')[1][0]).toBe('banana');
    expect(groupArrayBy(testIngredientsArray, 'name')[2][0]).toBe('cliff bars');
  });
});
