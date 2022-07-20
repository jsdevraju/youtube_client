import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./style.module.css";
import { AiOutlineSetting, AiTwotoneHome } from "react-icons/ai";
import { FaHistory, FaNewspaper } from "react-icons/fa";
import {
  MdExplore,
  MdHelpCenter,
  MdLibraryMusic,
  MdLiveTv,
  MdLocalMovies,
  MdOutlineAccountCircle,
  MdReport,
  MdSportsVolleyball,
  MdSubscriptions,
  MdVideogameAsset,
  MdVideoLibrary,
} from "react-icons/md";
import Image from "../Image/Image";
import Link from "next/link";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { apiEndPoint } from "../../../utils";
import toast from "react-hot-toast";
import { setAuth } from "../../redux/auth";
import cookie from "js-cookie";

const Menu = () => {
  const router = useRouter();
  // Part 1 Menu
  const firstMenu = [
    {
      name: "Home",
      url: "/",
      icon: <AiTwotoneHome />,
      className: router.pathname == "/" ? `${styles.active}` : `${styles.item}`,
    },
    {
      name: "Explore",
      url: "/explore",
      icon: <MdExplore />,
      className:
        router.pathname == "/explore" ? `${styles.active}` : `${styles.item}`,
    },
    {
      name: "Subscriptions",
      url: "/subscriptions",
      icon: <MdSubscriptions />,
      className:
        router.pathname == "/subscriptions"
          ? `${styles.active}`
          : `${styles.item}`,
    },
  ];
  // Part 2 Menu
  const secondMenu = [
    {
      name: "Library",
      url: "/library",
      icon: <MdVideoLibrary />,
      className:
        router.pathname == "/library" ? `${styles.active}` : `${styles.item}`,
    },
    {
      name: "History",
      url: "/history",
      icon: <FaHistory />,
      className:
        router.pathname == "/history" ? `${styles.active}` : `${styles.item}`,
    },
  ];
  // Part 3 Menu
  const thirdMenu = [
    {
      name: "Music",
      url: "/music",
      icon: <MdLibraryMusic />,
      className:
        router.pathname == "/music" ? `${styles.active}` : `${styles.item}`,
    },
    {
      name: "History",
      url: "/history",
      icon: <FaHistory />,
      className:
        router.pathname == "/history" ? `${styles.active}` : `${styles.item}`,
    },
    {
      name: "Sports",
      url: "/sports",
      icon: <MdSportsVolleyball />,
      className:
        router.pathname == "/sports" ? `${styles.active}` : `${styles.item}`,
    },
    {
      name: "Gaming",
      url: "/gaming",
      icon: <MdVideogameAsset />,
      className:
        router.pathname == "/gaming" ? `${styles.active}` : `${styles.item}`,
    },
    {
      name: "Movies",
      url: "/movies",
      icon: <MdLocalMovies />,
      className:
        router.pathname == "/movies" ? `${styles.active}` : `${styles.item}`,
    },
    {
      name: "News",
      url: "/news",
      icon: <FaNewspaper />,
      className:
        router.pathname == "/news" ? `${styles.active}` : `${styles.item}`,
    },
    {
      name: "Live",
      url: "/live",
      icon: <MdLiveTv />,
      className:
        router.pathname == "/live" ? `${styles.active}` : `${styles.item}`,
    },
  ];
  // Part 4 and final part
  const fourMenu = [
    {
      name: "Setting",
      url: "/setting",
      icon: <AiOutlineSetting />,
      className:
        router.pathname == "/setting" ? `${styles.active}` : `${styles.item}`,
    },
    {
      name: "Report",
      url: "/report",
      icon: <MdReport />,
      className:
        router.pathname == "/report" ? `${styles.active}` : `${styles.item}`,
    },
    {
      name: "Help",
      url: "/help",
      icon: <MdHelpCenter />,
      className:
        router.pathname == "/help" ? `${styles.active}` : `${styles.item}`,
    },
  ];

  const { token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${apiEndPoint}/auth/logout`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      toast.success("Logout Successfully");
      dispatch(setAuth(data));
      localStorage.removeItem("user");
      cookie.remove("token");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/">
          <div className={styles.logo}>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
              alt="jsdevrazu"
            />
            Youtube
          </div>
        </Link>
        {/* Menu Item First */}
        {firstMenu.map(({ name, url, className, icon }, index: any) => (
          <Link href={url} key={index}>
            <div className={className}>
              {icon}
              <h5>{name}</h5>
            </div>
          </Link>
        ))}
        {/* Horizontal Line */}
        <div className={styles.hr} />
        {/* Menu Item Second */}
        {secondMenu.map(({ name, url, className, icon }, index: any) => (
          <Link href={url} key={index}>
            <div className={className}>
              {icon}
              <h5>{name}</h5>
            </div>
          </Link>
        ))}
        {/* Horizontal Line */}
        <div className={styles.hr} />
        {/* Login Container */}
        {!token && (
          <>
            <div className={styles.login}>
              <p>Sign in to like videos, comment, and Subscribe</p>
              <Button
                className="app_btn"
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                onClick={() => router.push("/login")}
              >
                <MdOutlineAccountCircle /> Sign In
              </Button>
            </div>
            <div className={styles.hr} />
          </>
        )}
        {/* Menu Item Second */}
        {thirdMenu.map(({ name, url, className, icon }, index: any) => (
          <Link href={url} key={index}>
            <div className={className}>
              {icon}
              <h5>{name}</h5>
            </div>
          </Link>
        ))}
        {/* Horizontal Line */}
        <div className={styles.hr} />
        {/* Menu Item Second */}
        {fourMenu.map(({ name, url, className, icon }, index: any) => (
          <Link href={url} key={index}>
            <div className={className}>
              {icon}
              <h5>{name}</h5>
            </div>
          </Link>
        ))}
        {token && (
          <>
            {/* Horizontal Line */}
            <div className={styles.hr} />
            <div className={styles.item} onClick={handleLogout}>
              <FiLogOut />
              <h5>Logout</h5>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
