import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from '../User';
import ButtonStyles from '../styles/ButtonStyles';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOutButton() {
  const [signoutMutation] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <ButtonStyles
      type="button"
      className="signOutButton yellow"
      onClick={() => {
        signoutMutation();
        Router.push({ pathname: '/signin' });
      }}
    >
      Sign Out
    </ButtonStyles>
  );
}
