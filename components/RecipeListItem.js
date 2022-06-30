import Link from 'next/link';
import ListItemStyles from './styles/ListItemStyles';

export default function RecipeListItem({ recipe }) {
  return (
    <ListItemStyles key={recipe?.id}>
      {recipe?.photo?.image?.publicUrlTransformed ? (
        <img
          src={recipe?.photo?.image?.publicUrlTransformed}
          alt={recipe?.photo?.altText || recipe?.name}
        />
      ) : (
        <div className="noPhoto" />
      )}
      <div className="details">
        <h3>
          <Link href={`/recipe/${recipe?.id}`}>{recipe?.name}</Link>
        </h3>
      </div>
    </ListItemStyles>
  );
}
