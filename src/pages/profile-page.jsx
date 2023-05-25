import Profile from "../components/profile/profile";
import ProfileMenu from "../components/profile-menu/profile-menu";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <>
      <ProfileMenu />
      <Outlet />
    </>
  );
};

export default ProfilePage;
