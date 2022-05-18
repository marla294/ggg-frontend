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
  .bar {
    border-bottom: 1rem solid var(--purple);
    display: grid;
    grid-template-columns: minmax(200px, auto) 1fr;
    justify-content: space-between;
    align-items: center;
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">go get ur groceries</Link>
        </Logo>
        <Nav />
      </div>
    </HeaderStyles>
  );
}
