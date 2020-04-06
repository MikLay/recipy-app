import React, { Component } from "react";
import styled from "styled-components";
import { Route, Router, Switch } from "react-router-dom";
import history from "../../history";
import { url } from "../../constants";
import { Footer, Header } from "../../components";
import { Recipes } from "../";
import Recipe from "../Recipe/Recipe";
import EditRecipe from "../AddRecipe/EditRecipe";
import CreateRecipe from "../CreateRecipe/CreateRecipe";

const PageContainer = styled.div`
  height: 100%;
  display: flex !important;
  flex-direction: column !important;
`;

const ContentContainer = styled.div`
  flex: 1 0 auto !important;
`;

class App extends Component {
  render() {
    return (
      <>
        <PageContainer>
          <Router history={history}>
            <Header />
            <Switch>
              <ContentContainer
                style={{ background: "#d5c8c86e", height: "100%" }}
              >
                <Route
                  path={[url.URL_RECIPES, "/"]}
                  exact
                  strict
                  component={Recipes}
                />
                <Route path={[url.URL_RECIPY]} exact component={Recipe} />
                <Route
                  path={[url.URL_EDIT_RECIPY]}
                  exact
                  component={EditRecipe}
                />
                <Route
                  path={[url.URL_ADD_RECIPY]}
                  exact
                  component={CreateRecipe}
                />
              </ContentContainer>
            </Switch>
            <Footer />
          </Router>
        </PageContainer>
      </>
    );
  }
}

export default App;
