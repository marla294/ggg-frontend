import SingleIngredient from '../../components/SingleIngredient';

export default function SingleIngredientPage({ query }) {
  return <SingleIngredient id={query.id} />;
}
