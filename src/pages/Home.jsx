

import Header from "../components/home/Header";
import UserProfile from "../components/shared/UserProfile";

const Home = () => {


  return (
    <div className="relative h-screen w-full">
      <UserProfile />

      {/* Main Content */}
      <Header />
    </div>
  );
};

export default Home;
