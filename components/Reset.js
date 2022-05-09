import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });
  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  return (
    <FormStyles
      method="POST"
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await reset().catch(console.error);
        resetForm();
      }}
    >
      <fieldset>
        <h2>reset your password</h2>
        <DisplayError error={error || successfulError} />
        {data?.redeemUserPasswordResetToken === null && (
          <p>success! you can now sign in</p>
        )}
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
          reset
        </button>
      </fieldset>
    </FormStyles>
  );
}
