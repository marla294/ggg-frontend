import Link from 'next/link';
// import AddToShoppingList from './AddToShoppingList';
// import DeleteIngredient from './DeleteIngredient';
// import ButtonStyles from './styles/ButtonStyles';
import ListItemStyles from './styles/ListItemStyles';

export default function RecipeListItem({ recipe }) {
  return (
    <ListItemStyles>
      {/* {ingredient?.photo?.image?.publicUrlTransformed ? (
        <img
          src={ingredient?.photo?.image?.publicUrlTransformed}
          alt={ingredient?.photo?.altText || ingredient?.name}
        />
      ) : (
        <div className="noPhoto" />
      )} */}
      <div className="noPhoto" />
      <div className="details">
        <h3>
          <Link href={`/recipe/${recipe?.id}`}>{recipe?.name}</Link>
        </h3>
        {/* <p>{ingredient?.description}</p> */}
      </div>
      {/* <ButtonStyles>
        <AddToShoppingList ingredient={ingredient}>
          Add to shopping list
        </AddToShoppingList>
      </ButtonStyles>
      <DeleteIngredient id={ingredient?.id}>&times;</DeleteIngredient> */}
    </ListItemStyles>
  );
}
