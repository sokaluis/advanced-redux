import { Link } from "react-router-dom";
import { useAppSelector } from '../../../app/stores';
import { selectCurrentToken, selectCurrentUser } from "../authSelectors";

const Welcome = () => {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user}!` : 'Welcome!';
  const tokenAbbr = `${token?.slice(0, 9)}...`;

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <p><Link to="/userslist">Go to the Users List</Link></p>
    </section>
  );

  return content;
};
export default Welcome;