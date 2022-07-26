import RequestResetForm from '../components/RequestResetForm';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query.token) {
    return (
      <div>
        <p>sorry you must supply a token</p>
        <RequestResetForm />
      </div>
    );
  }
  return (
    <div>
      <Reset token={query.token} />
    </div>
  );
}
