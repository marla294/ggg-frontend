import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import DisplayError from './ErrorMessage';
import ButtonStyles from './styles/ButtonStyles';
import DeleteIngredient from './DeleteIngredient';

const SingleIngredientStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  max-width: var(--maxWidth);
  align-items: top;
  grid-gap: 5rem;
  img {
    width: 100%;
    max-height: 300px;
    object-fit: contain;
  }
  .noPhoto {
    width: 100%;
    max-height: 300px;
    display: grid;
    align-content: center;
    justify-content: center;
    border: 1px dashed var(--black);
  }
`;

const SINGLE_INGREDIENT_QUERY = gql`
  query SINGLE_INGREDIENT_QUERY($id: ID!) {
    Ingredient(where: { id: $id }) {
      id
      name
      description
      aisle
      homeArea
      units
      store
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

export default function SingleIngredient({ id }) {
  const { data, loading, error } = useQuery(SINGLE_INGREDIENT_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Ingredient } = data;
  return (
    <SingleIngredientStyles>
      <Head>
        <title>Go Get Groceries | {Ingredient.name}</title>
      </Head>
      {Ingredient?.photo?.image?.publicUrlTransformed ? (
        <img
          src={Ingredient?.photo?.image?.publicUrlTransformed}
          alt={Ingredient?.photo?.altText}
        />
      ) : (
        <div className="noPhoto">Needs photo 📸</div>
      )}
      <div>
        <h2>{Ingredient.name}</h2>
        <p>{Ingredient.description}</p>
        <p>
          <b>Aisle:</b> {Ingredient.aisle}
        </p>
        <p>
          <b>Home Area:</b> {Ingredient.homeArea}
        </p>
        <p>
          <b>Units:</b> {Ingredient.units}
        </p>
        <p>
          <b>Store:</b> {Ingredient.store}
        </p>
        <div>
          <ButtonStyles style={{ margin: '1rem 0 0 0' }}>
            <Link
              passHref
              href={{
                pathname: '/updateingredient',
                query: {
                  id: Ingredient.id,
                },
              }}
            >
              <button type="button" className="yellow">
                Edit Ingredient
              </button>
            </Link>
            <DeleteIngredient id={Ingredient.id}>Delete</DeleteIngredient>
          </ButtonStyles>
        </div>
      </div>
    </SingleIngredientStyles>
  );
}
