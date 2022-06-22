import styled from 'styled-components';

const ListStyles = styled.div`
  display: grid;
  grid-template-areas: 'a a';
  gap: 1rem;
  grid-auto-columns: minmax(10rem, 20rem);
  @media (min-width: 768px) {
    grid-template-areas: 'a';
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
`;

export default ListStyles;
