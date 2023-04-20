import { Outlet } from "react-router-dom";
import UserChatComponent from "./UserChatComponent";

const RoutesWithUserChatComponenet = () => {
  return (
    <>
      <UserChatComponent />
      <Outlet />
    </>
  );
};
export default RoutesWithUserChatComponenet;
