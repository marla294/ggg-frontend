import styled from 'styled-components';

const IngredientsBarStyles = styled.div`
  margin-bottom: 1rem;
  display: grid;
  font-size: 1.1rem;
  grid-gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 3rem repeat(2, 1fr);
  }

  input,
  select {
    padding: 0.5rem;
    font-size: 1.1rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: var(--orange);
    }
  }
`;

export default IngredientsBarStyles;
