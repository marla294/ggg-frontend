import styled from 'styled-components';

const ListItemStyles = styled.div`
  background: white;
  border: 1px solid var(--lightGray);
  font-size: 0.7rem;
  position: relative;
  display: grid;
  justify-items: center;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 0;
    font-size: 1rem;
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: row;
  }

  img {
    object-fit: cover;
    height: 20rem;
    width: 100%;
    @media (min-width: 768px) {
      margin: 0;
      height: 100%;
      min-width: 5rem;
      width: 5rem;
      padding: 1rem;
    }
  }
  .noPhoto {
    height: 20rem;
    width: 100%;
    @media (min-width: 768px) {
      margin: 0;
      height: 100%;
      min-width: 5rem;
      width: 5rem;
    }
  }
  .details {
    grid-row: 3;
    height: 4rem;
    width: 100%;
    line-height: 1.2rem;
    padding: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (min-width: 768px) {
      margin-left: 1rem;
    }
  }
  .removeFromShoppingList {
    @media (min-width: 768px) {
      width: 6rem;
      position: absolute;
      top: 1.2rem;
      right: 3rem;
    }
  }
  .editShoppingItem {
    @media (min-width: 768px) {
      width: 6rem;
      position: absolute;
      top: 1.2rem;
      right: 10rem;
    }
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
    @media (min-width: 768px) {
      width: 14rem;
      position: absolute;
      top: 1.2rem;
      right: 3rem;
    }
  }
`;

export default ListItemStyles;
