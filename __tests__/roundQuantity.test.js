import roundQuantity from '../lib/roundQuantity';

describe('roundQuantity function', () => {
  it('does not try to round integers', () => {
    expect(roundQuantity(10).toString()).toEqual('10');
    expect(roundQuantity(10.0).toString()).toEqual('10');
  });
  it('rounds to nearest tenth', () => {
    expect(roundQuantity(10.26).toString()).toEqual('10.3');
    expect(roundQuantity(15.2948582).toString()).toEqual('15.3');
    expect(roundQuantity(15.2120485).toString()).toEqual('15.2');
    expect(roundQuantity(15.2).toString()).toEqual('15.2');
    expect(roundQuantity(15.20001).toString()).toEqual('15.2');
    expect(roundQuantity(0.26).toString()).toEqual('0.3');
  });
  it('returns a whole number if it rounds down to it', () => {
    expect(roundQuantity(10.01).toString()).toEqual('10');
  });
});
