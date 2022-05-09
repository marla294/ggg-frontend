import RequestReset from '../components/RequestReset';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

export default function SignInPage() {
  return (
    <div>
      <SignIn />
      <SignUp />
      <RequestReset />
    </div>
  );
}
