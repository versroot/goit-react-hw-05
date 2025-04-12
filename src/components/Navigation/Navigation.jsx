import { NavLink } from "react-router";
import css from "./Navigation.module.css";
const getLinkStyle = ({ isActive }) => {
  return isActive ? css.active : css.link;
};
export default function Navigation() {
  return (
    <header>
      <nav>
        <ul className={css.navList}>
          <li>
            <NavLink to="/" className={getLinkStyle}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={getLinkStyle}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
