import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import DisplayError from './ErrorMessage';
import ButtonStyles from './styles/ButtonStyles';
import DeleteIngredient from './DeleteIngredient';

const SingleRecipeStyles = styled.div`
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

export default function SingleRecipe({ id }) {
  const { data, loading, error } = useQuery(SINGLE_RECIPE_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Recipe } = data;
  return (
    <SingleRecipeStyles>
      <Head>
        <title>Go Get Groceries | {Recipe.name}</title>
      </Head>
      {Recipe?.photo?.image?.publicUrlTransformed ? (
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
          <ButtonStyles style={{ margin: '1rem 0 0 0' }}>
            {/* <Link
              passHref
              href={{
                pathname: '/updaterecipe',
                query: {
                  id: Recipe.id,
                },
              }}
            >
              <button type="button" className="yellow">
                Edit Recipe
              </button>
            </Link> */}
            {/* <DeleteIngredient id={Recipe.id}>Delete</DeleteIngredient> */}
          </ButtonStyles>
        </div>
      </div>
    </SingleRecipeStyles>
  );
}
