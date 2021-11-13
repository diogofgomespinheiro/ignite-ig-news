import * as React from 'react';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

type ActiveLinkProps = {
  children: React.ReactElement;
  activeClassName: string;
} & LinkProps;

function ActiveLink({ children, activeClassName, ...props }: ActiveLinkProps) {
  const { asPath } = useRouter();

  const className = asPath === props.href ? activeClassName : '';

  return <Link {...props}>{React.cloneElement(children, { className })}</Link>;
}

export default ActiveLink;
