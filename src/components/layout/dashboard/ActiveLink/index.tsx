import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  checkHref: string;
}

export function ActiveLink({ children, checkHref, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: asPath === checkHref ? '#eeeef0' : '#a6b0cf',
        px: '10px',
        py: '4px',
        borderRadius: '5px',
      })}
    </Link>
  );
}
