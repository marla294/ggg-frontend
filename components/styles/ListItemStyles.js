import styled from 'styled-components';

const ListItemStyles = styled.div`
  background: white;
  /* border: 1px solid var(--lightGray); */
  font-size: 1rem;
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 10rem 5fr;
  width: 100%;
  height: 10rem;
  padding: 0;

  img {
    object-fit: cover;
    margin: 0;
    height: 10rem;
    min-width: 10rem;
    width: 5rem;
  }
  .noPhoto {
    margin: 0;
    height: 5rem;
    min-width: 5rem;
    width: 5rem;
  }
  .details {
    width: 100%;
    padding: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 2rem;
    align-self: center;
    justify-self: center;
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

  &.loadingDelete {
    background-color: rgba(1, 1, 1, 0.25);
    z-index: 500;
  }
`;

export default ListItemStyles;
