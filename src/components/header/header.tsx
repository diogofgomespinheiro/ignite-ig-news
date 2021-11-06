import Image from 'next/image';

import SignInButton from '../signin-button/signin-button';

import styles from './styles.module.scss';

function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src="/assets/logo.svg" alt="ig.news" width={110} height={31} />
        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}

export default Header;
