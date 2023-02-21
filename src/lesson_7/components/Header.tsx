import { Link } from "react-router-dom";

const Header = () => (
  <header className="Header">
    <h1>Redux Blog</h1>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="post">New Post</Link></li>
        <li><Link to="user">User</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;