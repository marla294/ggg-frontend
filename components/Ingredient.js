import Link from 'next/link';
import styled from 'styled-components';

const IngredientStyles = styled.div`
  background: white;
  border: 1px solid var(--offWhite);
  display: flex;
  flex-direction: row;
  position: relative;
  font-size: 1rem;
  img {
    width: 5rem;
    height: 100%;
    object-fit: cover;
  }
  .noPhoto {
    width: 5rem;
    height: 100%;
    background-color: var(--orange);
  }
  .details {
    margin-left: 1rem;
  }
  button {
    background: transparent;
    color: var(--orange);
    border: none;
    font-size: 1.5rem;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export default function Ingredient({ ingredient }) {
  return (
    <IngredientStyles>
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
          <Link href={`/ingredient/${ingredient.id}`}>{ingredient?.name}</Link>
        </h3>
        <p>{ingredient?.description}</p>
      </div>
      <button>&times;</button>
    </IngredientStyles>
  );
}
