import styled from 'styled-components';

const ModalBackgroundStyles = styled.div`
  display: none;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &.open {
    display: grid;
  }
`;

export default ModalBackgroundStyles;
