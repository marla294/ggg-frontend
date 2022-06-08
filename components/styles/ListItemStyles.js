import styled from 'styled-components';

const ListItemStyles = styled.div`
  background: white;
  border: 1px solid var(--lightGray);
  height: 5rem;
  display: flex;
  flex-direction: row;
  position: relative;
  font-size: 1rem;
  img {
    width: 5rem;
    height: 100%;
    object-fit: cover;
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
    position: absolute;
    top: 0;
    right: 0;
  }
  .addToShoppingList {
    width: 14rem;
    position: absolute;
    top: 1.2rem;
    right: 3rem;
  }
`;

export default ListItemStyles;
