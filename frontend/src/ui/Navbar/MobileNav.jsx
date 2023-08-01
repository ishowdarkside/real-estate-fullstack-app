/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { useState } from "react";

export default function MobileNav({ isLoading, user, NavLogin }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={styles.mobileNav}>
      <h1>Mojdom</h1>
      <button onClick={() => setIsActive(true)}>
        <HiMenuAlt3 />
      </button>

      <div className={`${styles.mobilePanel} ${isActive && styles.active}`}>
        <h1>Mojdom</h1>
        <button
          onClick={() => setIsActive(false)}
          className={styles.closePanel}
        >
          <MdOutlineClose />
        </button>
        <ul>
          <li onClick={() => setIsActive(false)}>
            <NavLink to="/app/dashboard">Početna</NavLink>
          </li>
          <li onClick={() => setIsActive(false)}>
            <NavLink to="/app/catalog">Traži oglase</NavLink>
          </li>

          <li onClick={() => setIsActive(false)}>
            <NavLink to="/app/create-post">
              <img src="/plus.svg" />
              Objavi
            </NavLink>
          </li>

          <li onClick={() => setIsActive(false)}>
            {!isLoading && user && (
              <NavLink to="/app/me">
                <img src="/user-sm.svg" />
                Profil
              </NavLink>
            )}
            {!isLoading && !user && <NavLogin />}
          </li>
        </ul>
      </div>
    </div>
  );
}
