import Head from 'next/head';
import { useUser } from './User';
import SignOutButton from './Buttons/SignOutButton';

export default function Account() {
  const user = useUser();
  return (
    <div>
      <Head>
        <title>Your Account | Go Get Ur Groceries</title>
      </Head>
      <h2>Your Account Details</h2>
      <div>
        <b>Name: </b> {user?.name}
      </div>
      <div>
        <b>Email: </b> {user?.email}
      </div>
      <div>
        <b>Join Date: </b> {user?.joinDate || 'N/A'}
      </div>
      <br />
      <SignOutButton />
    </div>
  );
}
