import  {
  CounterState,
  increment,
  decrement,
  incrementByAmount,
  counterSliceReducer
} from './counterSlice';

describe('counter reducer', () => {
  const initialState: CounterState = {
    value: 3,
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(counterSliceReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    });
  });

  it('should handle increment', () => {
    const actual = counterSliceReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it('should handle decrement', () => {
    const actual = counterSliceReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it('should handle incrementByAmount', () => {
    const actual = counterSliceReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});
