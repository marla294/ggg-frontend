import styled from 'styled-components';

const SortByStyles = styled.div`
  display: grid;
  align-items: center;
  @media (min-width: 768px) {
    grid-template-columns: minmax(3.5rem, auto) 1fr;
  }
`;

export default SortByStyles;
