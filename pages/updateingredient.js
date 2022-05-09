import UpdateIngredient from '../components/UpdateIngredient';

export default function UpdateIngredientPage({ query }) {
  return (
    <div>
      <UpdateIngredient id={query.id} />
    </div>
  );
}
