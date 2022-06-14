import styled from 'styled-components';

const IngredientsBarStyles = styled.div`
  margin-bottom: 1rem;
  display: grid;
  grid-gap: 0.5rem;
  font-size: 0.8rem;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    grid-gap: 2rem;
    grid-template-columns: 3rem repeat(2, 1fr);
  }

  input,
  select {
    padding: 0.3rem;
    border: 1px solid black;
    font-size: 0.9rem;
    @media (min-width: 768px) {
      padding: 0.5rem;
      font-size: 1.1rem;
    }
    &:focus {
      outline: 0;
      border-color: var(--orange);
    }
  }

  button {
  }
`;

export default IngredientsBarStyles;
