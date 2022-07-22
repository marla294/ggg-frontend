import styled from 'styled-components';

const DropDown = styled.div`
  display: none;
  position: absolute;
  z-index: 2;
  width: 75%;
  max-height: 20rem;
  overflow: auto;
  border: 1px solid var(--lightGray);
  &.open {
    display: block;
  }
`;

const DropDownItemCover = styled.div`
  background-color: white;
  transition: all 0.1s;
  :hover {
    padding-left: 0.3rem;
    background-color: yellow;
  }
  :focus {
    outline: none;
    padding-left: 0.3rem;
    background-color: yellow;
  }
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid var(--lightGray);
  background: white;
  display: grid;
  grid-template-columns: 4rem auto;
  grid-gap: 1rem;
  align-items: center;
  height: 4rem;
  cursor: pointer;
  img {
    width: 4rem;
    max-height: 3.9rem;
    object-fit: cover;
    padding: 0.5rem;
  }
  .noPhoto {
    width: 4rem;
    height: 100%;
  }
  :hover {
    text-decoration: underline;
  }
`;

export { DropDown, DropDownItemCover, DropDownItem };
