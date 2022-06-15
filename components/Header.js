import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

const Logo = styled.h1`
  font-size: 2rem;
  background: #ff5733;
  a {
    color: white;
    text-decoration: none;
    text-transform: lowercase;
    padding: 0.5rem 1rem;
  }

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const HeaderStyles = styled.header`
  display: grid;
  grid-template-columns: minmax(200px, auto) 1fr;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5rem solid var(--purple);

  @media (min-width: 768px) {
    border-bottom: 1rem solid var(--purple);
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <Logo>
        <Link href="/">go get ur groceries</Link>
      </Logo>
      <Nav />
    </HeaderStyles>
  );
}
