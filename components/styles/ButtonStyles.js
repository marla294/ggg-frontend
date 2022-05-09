import styled from 'styled-components';

const ButtonStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(10, auto);
  grid-gap: 1rem;

  button {
    width: auto;
    padding: 0.7rem 1rem;
    transition: 0.2s;
  }

  .small {
    font-size: 1.1rem;
    padding: 0.5rem 0.8rem;
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
