import NProgress from 'nprogress';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import withData from '../lib/withData';
import { AddIngredientStateProvider } from '../lib/addIngredientState';
import { UpdateShoppingItemStateProvider } from '../lib/updateShoppingItemState';
import { UpdateRecipeItemStateProvider } from '../lib/updateRecipeItemState';
import { AddShoppingListItemStateProvider } from '../lib/addShoppingListItemState';
import { AddRecipeItemStateProvider } from '../lib/addRecipeItemState';
import { MobileNavStateProvider } from '../lib/mobileNavState';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <AddIngredientStateProvider>
        <UpdateShoppingItemStateProvider>
          <AddShoppingListItemStateProvider>
            <AddRecipeItemStateProvider>
              <UpdateRecipeItemStateProvider>
                <MobileNavStateProvider>
                  <Page>
                    <Component {...pageProps} />
                  </Page>
                </MobileNavStateProvider>
              </UpdateRecipeItemStateProvider>
            </AddRecipeItemStateProvider>
          </AddShoppingListItemStateProvider>
        </UpdateShoppingItemStateProvider>
      </AddIngredientStateProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
