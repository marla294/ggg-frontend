import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from '../User';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

const SignOutButtonStyles = styled.button`
  background-color: transparent;
  border: none;
  color: var(--black);
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  :hover {
    text-decoration: underline;
  }
`;

export default function SignOutButton() {
  const [signoutMutation] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <SignOutButtonStyles
      type="button"
      className="signOutButton"
      onClick={() => {
        signoutMutation();
        Router.push({ pathname: '/signin' });
      }}
    >
      Sign Out
    </SignOutButtonStyles>
  );
}
