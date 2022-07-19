import styled from 'styled-components';

const ModalStyles = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  background-color: white;
  width: 40rem;
  max-width: 100%;
  max-height: 100%;
  z-index: 110;
  &.open {
    display: grid;
    border: 1px solid var(--lightGray);
  }
  .modalInputContainer {
    display: grid;
    grid-template-columns: 1fr 5fr;
    grid-gap: 1rem;
  }
  .close {
    background: transparent;
    color: var(--orange);
    border: none;
    font-size: 1.5rem;
    position: absolute;
    top: 1.2rem;
    right: 2rem;
  }
  h2 {
    margin-bottom: 0.5rem;
  }
`;

export default ModalStyles;
