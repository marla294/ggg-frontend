import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';
import ButtonStyles from './styles/ButtonStyles';
import DeleteRecipe from './DeleteRecipe';
import { SingleItemStyles } from './styles/SingleItemStyles';
import ListStyles from './styles/ListStyles';
import RecipeIngredient from './RecipeIngredient';
import { ADD_TO_SHOPPING_LIST_MUTATION } from './AddIngredientToShoppingListModal';

const ButtonDivStyles = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  width: 100%;
  margin-top: 1rem;
`;

const SINGLE_RECIPE_QUERY = gql`
  query SINGLE_RECIPE_QUERY($id: ID!) {
    Recipe(where: { id: $id }) {
      id
      name
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
        altText
      }
    }
  }
`;

const ALL_RECIPE_ITEMS_QUERY = gql`
  query ALL_RECIPE_ITEMS_QUERY($id: ID!) {
    allRecipeItems(where: { recipe: { id: $id } }) {
      id
      ingredient {
        id
        name
        description
        store
        aisle
        homeArea
        units
        photo {
          id
          altText
          image {
            publicUrlTransformed
          }
        }
      }
      quantity
    }
  }
`;

function SingleRecipe({ id }) {
  const { data, loading, error } = useQuery(SINGLE_RECIPE_QUERY, {
    variables: {
      id,
    },
  });
  const { data: allRecipeItemsData, loading: allRecipeItemsLoading } = useQuery(
    ALL_RECIPE_ITEMS_QUERY,
    {
      variables: {
        id,
      },
    }
  );
  const [addToShoppingList] = useMutation(ADD_TO_SHOPPING_LIST_MUTATION);

  if (loading || allRecipeItemsLoading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Recipe } = data;
  return (
    <>
      <SingleItemStyles>
        <Head>
          <title>Go Get Groceries | {Recipe.name}</title>
        </Head>
        {Recipe?.photo?.image?.publicUrlTransformed ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            src={Recipe?.photo?.image?.publicUrlTransformed}
            alt={Recipe?.photo?.altText}
          />
        ) : (
          <div className="noPhoto">Needs photo 📸</div>
        )}
        <div>
          <h2>{Recipe.name}</h2>
          <p>{Recipe.description}</p>
          <div>
            <ButtonDivStyles>
              <Link
                passHref
                href={{
                  pathname: '/editrecipe',
                  query: {
                    id: Recipe.id,
                  },
                }}
              >
                <ButtonStyles type="button" className="yellow">
                  Edit Recipe
                </ButtonStyles>
              </Link>
              <ButtonStyles
                type="button"
                className="lime"
                onClick={async () => {
                  allRecipeItemsData?.allRecipeItems?.forEach(async (item) => {
                    await addToShoppingList({
                      variables: {
                        id: item?.ingredient?.id,
                        quantity: item?.quantity?.toString(),
                      },
                      refetchQueries: 'all',
                    });
                  });
                }}
              >
                Add to shopping list
              </ButtonStyles>
              <DeleteRecipe id={Recipe.id}>Delete</DeleteRecipe>
            </ButtonDivStyles>
          </div>
        </div>
      </SingleItemStyles>
      <div>
        <h3>Recipe Ingredients</h3>
        <ListStyles>
          {allRecipeItemsData?.allRecipeItems?.map((item) => (
            <RecipeIngredient
              ingredient={item?.ingredient}
              quantity={item?.quantity}
              key={item?.ingredient?.id}
            />
          ))}
        </ListStyles>
      </div>
    </>
  );
}

SingleRecipe.propTypes = {
  id: PropTypes.string,
};

export default SingleRecipe;

export { SINGLE_RECIPE_QUERY, ALL_RECIPE_ITEMS_QUERY };
