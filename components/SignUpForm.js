import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
    $joinDate: String!
  ) {
    createUser(
      data: {
        name: $name
        email: $email
        password: $password
        joinDate: $joinDate
      }
    ) {
      id
      name
      email
    }
  }
`;

export default function SignUpForm() {
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [signUp, { data, error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      joinDate: new Date().toLocaleDateString(),
    },
  });
  return (
    <FormStyles
      method="POST"
      onSubmit={async (e) => {
        e.preventDefault();
        await signUp().catch(console.error);
        resetForm();
      }}
    >
      <fieldset disabled={loading}>
        <h2>Sign up for an account</h2>
        <DisplayError error={error} />
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please go ahead and sign
            in!
          </p>
        )}
        <label htmlFor="name">
          Full Name<span className="required">&nbsp;*</span>
          <input
            required
            type="name"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email<span className="required">&nbsp;*</span>
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password<span className="required">&nbsp;*</span>
          <input
            required
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="submit">
          Sign Up
        </button>
      </fieldset>
    </FormStyles>
  );
}
