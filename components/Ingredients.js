/* eslint-disable jsx-a11y/label-has-associated-control */
import Router from 'next/router';
import Head from 'next/head';
import ButtonStyles from './styles/ButtonStyles';
import useForm from '../lib/useForm';
import IngredientsList from './IngredientsList';
import PleaseSignIn from './PleaseSignIn';
import IngredientsBarStyles from './styles/IngredientsBarStyles';
import SortByStyles from './styles/SortByStyles';

export default function Ingredients() {
  const { inputs, handleChange } = useForm({
    searchTerm: '',
    sortBy: 'alphabetical',
  });

  const sortOptions = [
    { display: 'Alphabetical', value: 'alphabetical' },
    { display: 'Aisle', value: 'aisle' },
    { display: 'Home area', value: 'homeArea' },
    { display: 'Store', value: 'store' },
  ];

  return (
    <PleaseSignIn>
      <Head>
        <title>Ingredients | Go Get Ur Groceries</title>
      </Head>
      <IngredientsBarStyles>
        <div>
          <ButtonStyles
            type="button"
            className="lime small"
            onClick={() => {
              Router.push({ pathname: '/createingredient' });
            }}
          >
            Add
          </ButtonStyles>
        </div>
        <SortByStyles>
          <label htmlFor="sortBy">Sort:</label>
          <select
            name="sortBy"
            id="sortBy"
            value={inputs.sortBy}
            onChange={handleChange}
          >
            {sortOptions.map((option) => (
              <option
                value={option.value}
                name={option.value}
                id={option.value}
                key={Math.random()}
              >
                {option.display}
              </option>
            ))}
          </select>
        </SortByStyles>
        <input
          name="searchTerm"
          id="searchTerm"
          placeholder="Search..."
          value={inputs.searchTerm}
          onChange={handleChange}
        />
      </IngredientsBarStyles>
      <h2>Ingredients</h2>
      <IngredientsList searchTerm={inputs.searchTerm} sortBy={inputs.sortBy} />
    </PleaseSignIn>
  );
}
