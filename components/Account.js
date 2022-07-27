import { useUser } from './User';
import SignOutButton from './Buttons/SignOutButton';

export default function Account() {
  const user = useUser();
  return (
    <div>
      <h2>Your Account Details</h2>
      <div>
        <b>Name: </b> {user?.name}
      </div>
      <div>
        <b>Email: </b> {user?.email}
      </div>
      <SignOutButton />
    </div>
  );
}
