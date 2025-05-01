import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>Movie Browser</Link>
        <nav>
          <ul className={styles.navList}>
            <li><Link to="/" className={styles.navLink}>Home</Link></li>
            <li><Link to="/favorites" className={styles.navLink}>Favorites</Link></li>
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
