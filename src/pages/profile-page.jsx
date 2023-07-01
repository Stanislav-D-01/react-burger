import Profile from "../components/profile/profile";
import ProfileMenu from "../components/profile-menu/profile-menu";
import { Outlet } from "react-router-dom";
import styles from "./profile-page.module.css";

const ProfilePage = () => {
  return (
    <section className={styles["profile-page"]}>
      <ProfileMenu />
      <Outlet />
    </section>
  );
};

export default ProfilePage;
