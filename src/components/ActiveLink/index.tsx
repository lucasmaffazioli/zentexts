import { useRouter } from 'next/dist/client/router';
import Link, { LinkProps } from 'next/link';
import { ReactElement, cloneElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
  detectableHref?: string;
}

export function ActiveLink({
  children,
  activeClassName,
  detectableHref,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();
  let className: string;

  if (detectableHref) {
    className = asPath.match(detectableHref) ? activeClassName : '';
  } else {
    className = asPath === rest.href ? activeClassName : '';
  }

  return <Link {...rest}>{cloneElement(children, { className })}</Link>;
}
