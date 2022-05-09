import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [requestReset, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      },
    }
  );
  return (
    <FormStyles
      method="POST"
      onSubmit={async (e) => {
        e.preventDefault();
        await requestReset().catch(console.error);
        resetForm();
      }}
    >
      <fieldset disabled={loading}>
        <h2>request password reset</h2>
        <DisplayError error={error} />
        {data?.sendUserPasswordResetLink === null && (
          <p>success! check your email for a link.</p>
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
        <button type="submit" className="submit">
          request reset
        </button>
      </fieldset>
    </FormStyles>
  );
}
