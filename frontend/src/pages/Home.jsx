import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import ChatSection from "../components/ChatSection";

const Home = () => {
  return (
    <div className="flex gap-3 h-[600px] w-[800px]">
      <LeftSidebar />
      <ChatSection />
    </div>
  );
};

export default Home;
