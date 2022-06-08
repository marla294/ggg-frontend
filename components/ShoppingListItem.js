import Link from 'next/link';
import RemoveItemFromShoppingList from './RemoveItemFromShoppingList';
import ButtonStyles from './styles/ButtonStyles';
import ListItemStyles from './styles/ListItemStyles';
import UpdateShoppingListItem from './UpdateShoppingListItem';

export default function ShoppingListItem({
  itemId,
  ingredient,
  quantity,
  shoppingListItem,
}) {
  return (
    <ListItemStyles>
      {ingredient?.photo?.image?.publicUrlTransformed ? (
        <img
          src={ingredient?.photo?.image?.publicUrlTransformed}
          alt={ingredient?.photo?.altText}
        />
      ) : (
        <div className="noPhoto" />
      )}
      <div className="details">
        <h3>
          <Link href={`/ingredient/${ingredient?.id}`}>{ingredient?.name}</Link>
        </h3>
        <p>
          amount: {quantity}{' '}
          {ingredient?.units === 'none' ? '' : ingredient?.units}
        </p>
      </div>
      <ButtonStyles>
        <UpdateShoppingListItem shoppingListItem={shoppingListItem}>
          update
        </UpdateShoppingListItem>
        <RemoveItemFromShoppingList itemId={itemId}>
          remove
        </RemoveItemFromShoppingList>
      </ButtonStyles>
    </ListItemStyles>
  );
}
