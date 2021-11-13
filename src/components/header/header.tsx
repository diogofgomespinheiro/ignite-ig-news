import Image from 'next/image';

import SignInButton from '@components/signin-button';
import ActiveLink from '@components/active-link';

import styles from './styles.module.scss';

function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src="/assets/logo.svg" alt="ig.news" width={110} height={31} />
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}

export default Header;
