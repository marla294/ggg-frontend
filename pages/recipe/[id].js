import SingleRecipe from '../../components/SingleRecipe';

export default function SingleRecipePage({ query }) {
  return <SingleRecipe id={query.id} />;
}
