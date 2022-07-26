import RequestResetForm from '../components/RequestResetForm';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

export default function SignInPage() {
  return (
    <div>
      <SignInForm />
      <SignUpForm />
      <RequestResetForm />
    </div>
  );
}
