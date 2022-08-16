import styled from 'styled-components';

const ListItemStyles = styled.div`
  background: white;
  border: 1px solid var(--lightGray);
  font-size: 1rem;
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 4rem 1fr 18rem;
  width: 100%;
  height: 5rem;
  padding: 0;

  img {
    object-fit: cover;
    margin: 0;
    height: 100%;
    min-width: 5rem;
    width: 5rem;
    padding: 1rem;
  }
  .noPhoto {
    margin: 0;
    height: 100%;
    min-width: 5rem;
    width: 5rem;
  }
  .details {
    height: 4rem;
    width: 100%;
    line-height: 1.2rem;
    padding: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 1rem;
    align-self: start;
  }
  .removeFromShoppingList {
    width: 2.5rem;
    height: 2.7rem;
    position: absolute;
    top: 1.2rem;
    right: 2rem;
  }
  .editShoppingItem {
    width: 2.5rem;
    height: 2.7rem;
    position: absolute;
    top: 1.2rem;
    right: 5rem;
    font-size: 0.8rem;
    padding: 0.5rem 0.6rem;
  }
  .delete {
    background: transparent;
    color: var(--orange);
    border: none;
    font-size: 1.5rem;
    position: absolute;
    top: 0;
    right: 0.5rem;
  }
  .addToShoppingList {
    width: 14rem;
    position: absolute;
    top: 1.2rem;
    right: 3rem;
  }
`;

export default ListItemStyles;
