import styled from 'styled-components';

const ButtonStyles = styled.button`
  width: auto;
  transition: 0.2s;
  margin: 0 !important;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;

  &.small {
    padding: 0.5rem 0.8rem;
    font-size: 1.1rem;
  }

  &.lime {
    background: var(--lime);
    color: var(--darkGreen);
    border: 1px solid var(--darkGreen);
    &:hover {
      background: var(--darkGreen);
      color: white;
    }
  }

  &.yellow {
    background: var(--yellow);
    color: var(--darkYellow);
    border: 1px solid var(--darkYellow);
    &:hover {
      background: var(--darkYellow);
      color: white;
    }
  }

  &.orange {
    background: var(--orange);
    color: var(--darkOrange);
    border: 1px solid var(--darkOrange);
    &:hover {
      background: var(--darkOrange);
      color: white;
    }
  }

  &.orange-nohover {
    background: var(--orange);
    color: var(--darkOrange);
    border: 1px solid var(--darkOrange);
  }

  &.link {
    background: none !important;
    border: none;
    padding: 0 !important;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default ButtonStyles;
