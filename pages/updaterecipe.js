import UpdateRecipe from '../components/UpdateRecipe';

export default function UpdateRecipePage({ query }) {
  return (
    <div>
      <UpdateRecipe id={query.id} />
    </div>
  );
}
