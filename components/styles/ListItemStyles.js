import styled from 'styled-components';

const ListItemStyles = styled.div`
  background: white;
  border: 1px solid var(--lightGray);
  font-size: 1rem;
  position: relative;

  @media (min-width: 768px) {
    height: 5rem;
    display: flex;
    flex-direction: row;
  }

  img {
    width: 5rem;
    object-fit: cover;
    @media (min-width: 768px) {
      height: 100%;
    }
  }
  .noPhoto {
    width: 5rem;
    height: 100%;
    background-color: var(--orange);
  }
  .details {
    margin-left: 1rem;
  }
  .removeFromShoppingList {
    width: 6rem;
    position: absolute;
    top: 1.2rem;
    right: 3rem;
  }
  .updateShoppingListItem {
    width: 6rem;
    position: absolute;
    top: 1.2rem;
    right: 10rem;
  }
  .delete {
    background: transparent;
    color: var(--orange);
    border: none;
    font-size: 1.5rem;
    @media (min-width: 768px) {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .addToShoppingList {
    @media (min-width: 768px) {
      width: 14rem;
      position: absolute;
      top: 1.2rem;
      right: 3rem;
    }
  }
`;

export default ListItemStyles;
