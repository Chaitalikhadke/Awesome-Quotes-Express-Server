import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <h1 >Awesome Quotes Application</h1>

      <Link className="btn btn-primary" to="/login">
        Login Here
      </Link>
    </div>
  );
};

export default Home;
