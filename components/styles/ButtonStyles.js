import styled from 'styled-components';

const ButtonStyles = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  width: 100%;

  button {
    width: auto;
    transition: 0.2s;
    @media (min-width: 768px) {
      margin: 0;
      padding: 0.7rem 1rem;
      font-size: 1.1rem;
    }
  }

  .small {
    font-size: 1rem;
    padding: 0.3rem;
    @media (min-width: 768px) {
      padding: 0.5rem 0.8rem;
      font-size: 1.1rem;
    }
  }

  .lime {
    background: var(--lime);
    color: var(--darkGreen);
    border: 1px solid var(--darkGreen);
    &:hover {
      background: var(--darkGreen);
      color: white;
    }
  }

  .yellow {
    background: var(--yellow);
    color: var(--darkYellow);
    border: 1px solid var(--darkYellow);
    &:hover {
      background: var(--darkYellow);
      color: white;
    }
  }

  .orange {
    background: var(--orange);
    color: var(--darkOrange);
    border: 1px solid var(--darkOrange);
    &:hover {
      background: var(--darkOrange);
      color: white;
    }
  }
`;

export default ButtonStyles;
