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
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

export default function SignUp() {
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
        <h2>sign up for an account</h2>
        <DisplayError error={error} />
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please go ahead and sign
            in!
          </p>
        )}
        <label htmlFor="name">
          your name<span className="required">&nbsp;*</span>
          <input
            required
            type="name"
            id="name"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
          sign on up
        </button>
      </fieldset>
    </FormStyles>
  );
}
