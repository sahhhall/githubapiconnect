import { useState } from "react";
import Explore from "./pages/header/Explore";
import Header from "./pages/header/Header";
import UserProfile from "./pages/profile/UserProfile";

const App = () => {
  const [explore, setExplore] = useState<boolean>(false);
  return (
    <div className="App">
      <Header setExplore={setExplore} />
      {explore ? <Explore /> : <UserProfile />}
    </div>
  );
};

export default App;
