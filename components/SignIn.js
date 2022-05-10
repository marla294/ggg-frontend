import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const [signIn, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: {
      email: inputs.email,
      password: inputs.password,
    },
    refetchQueries: [
      { query: CURRENT_USER_QUERY, fetchPolicy: 'network-only' },
    ],
  });
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;
  return (
    <FormStyles
      method="POST"
      onSubmit={async (e) => {
        e.preventDefault();
        await signIn();
        resetForm();
      }}
    >
      <fieldset disabled={loading}>
        <h2>sign into your account</h2>
        <DisplayError error={error} />
        <label htmlFor="email">
          email<span className="required">&nbsp;*</span>
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          password<span className="required">&nbsp;*</span>
          <input
            required
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="submit">
          sign on in
        </button>
      </fieldset>
    </FormStyles>
  );
}
