import { useAppDispatch, useAppSelector } from '../../app/store';
import { counterSelector } from './counterSelector';
import { decrement, increment, incrementByAmount, reset } from './counterSlice';

const Counter = () => {
  const dispatch = useAppDispatch();
  const { counter } = useAppSelector(counterSelector);

  return (
    <section>
      <p>{counter}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(incrementByAmount(2))}>+2</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </section>
  );
};

export default Counter;