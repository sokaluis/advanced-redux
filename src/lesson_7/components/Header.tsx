import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/stores";
import { getCounter } from "../feature/post/postsSelector";
import { increaseCount } from "../feature/post/postsSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const counter = useAppSelector(getCounter);

  return (
    <header className="Header">
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="post">New Post</Link></li>
          <li><Link to="user">User</Link></li>
        </ul>
        <button onClick={() => dispatch(increaseCount())}>{counter}</button>
      </nav>
    </header>
  );
};

export default Header;