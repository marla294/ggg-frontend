import styled from 'styled-components';

const ListItemStyles = styled.div`
  background: white;
  border: 1px solid var(--lightGray);
  font-size: 0.7rem;
  position: relative;
  display: grid;
  justify-items: center;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 0;
    font-size: 1rem;
    max-width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: row;
  }

  img {
    object-fit: cover;
    height: 8rem;
    max-width: 10rem;
    padding: 0.7rem;
    @media (min-width: 768px) {
      padding: 0;
      width: 5rem;
      height: 100%;
    }
  }
  .noPhoto {
    width: 5rem;
    height: 100%;
    background-color: var(--orange);
  }
  .details {
    @media (min-width: 768px) {
      margin-left: 1rem;
    }
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
    position: absolute;
    top: 0;
    right: 0;
    @media (min-width: 768px) {
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
