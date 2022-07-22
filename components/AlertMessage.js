import styled from 'styled-components';
import React from 'react';

const AlertStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const AlertMessage = ({ message }) => {
  if (!message) return null;
  return (
    <AlertStyles>
      <p data-test="graphql-error">
        <strong>Success!</strong>
        {message}
      </p>
    </AlertStyles>
  );
};

export default AlertMessage;
