import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDate } from 'date-fns';

const AlertStyles = styled.div`
  padding: 0 1rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid var(--lime);
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: space-between;
  p {
    margin: 0;
    font-weight: 100;
    padding: 2rem 1rem;
  }
  strong {
    margin-right: 1rem;
  }
  .close {
    background: transparent;
    color: var(--orange);
    border: none;
    font-size: 1.5rem;
    margin: 0;
    padding: 0.5rem 0 0 0;
    justify-self: end;
    align-self: start;
  }
  &.closed {
    display: none;
  }
`;

const AlertMessage = ({ message }) => {
  const [displayMessage, setDisplayMessage] = useState(null);
  useEffect(() => {
    if (message) setDisplayMessage(message);
  }, [message]);

  return (
    <AlertStyles className={displayMessage ? 'open' : 'closed'}>
      <p>
        <strong>Success!</strong>
        {displayMessage}
      </p>
      <button
        type="button"
        className="close"
        onClick={() => {
          setDisplayMessage(null);
        }}
      >
        &times;
      </button>
    </AlertStyles>
  );
};

AlertMessage.propTypes = {
  message: PropTypes.string,
};

export default AlertMessage;
