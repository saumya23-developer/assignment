import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>Movie Browser</Link>
        <nav>
          <ul className={styles.navList}>
            <li><Link to="/" className={styles.navLink}>Home</Link></li>
            <li><Link to="/favorites" className={styles.navLink}>Favorites</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
