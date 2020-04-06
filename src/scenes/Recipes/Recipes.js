import React, { useEffect, useState } from "react";
import RecipeCard from "./components/RecipeCard";
import styled from "styled-components";
import api from "../../api/api";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import Button from "react-bootstrap/Button";
import { CATEGORIES, SORTINGS } from "../../constants/entity_config";
import {useHistory} from "react-router";

const ToolPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 20px;
`;

const SearchCol = styled.div`
  min-width: 300px;
  margin-bottom: 10px;
`;

const SmallCol = styled.div`
  min-width: 120px;
`;

const CreateButtonCol = styled.div`
  padding: 10px;
  justify-content: center;
  display: flex;
`;

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [sort, setSort] = useState(SORTINGS[0]);
  const [searchName, setSearchName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const history = useHistory();

  useEffect(() => {
    api.fetchAllRecipes().then(setRecipes);
  }, []);

  const renderRecipesCards = recipes
    .filter(recipe =>
      recipe.name.toLowerCase().includes(searchName.toLowerCase())
    )
    .filter(recipe =>
      category && category.key !== "0" ? recipe.category === category.key : true
    )
    .sort(sort.func)
    .map(recipe => <RecipeCard recipe={recipe} key={recipe.id} />);

  return (
    <main>
      <div className="container">
        <ToolPanel>
          <Form>
            <Form.Group>
              <Row>
                <Col as={SearchCol}>
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    as="input"
                    placeholder="Enter name"
                    onChange={e => setSearchName(e.target.value)}
                  />
                </Col>
                <Col as={SmallCol}>
                  <Form.Label>Select sorting method</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={({ target }) => {
                      setSort(SORTINGS[target.value]);
                    }}
                    custom
                  >
                    {SORTINGS.map(sort => (
                      <option key={sort.key} value={sort.key}>
                        {sort.text}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col as={SmallCol}>
                  <Form.Label>Select category</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={({ target }) => {
                      setCategory(CATEGORIES[target.value]);
                    }}
                    custom
                  >
                    {CATEGORIES.map(sort => (
                      <option key={sort.key} value={sort.key}>
                        {sort.text}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col as={CreateButtonCol}>
                  <Button size="lg" variant="primary" onClick={() => history.push("/add")}>
                    <i className="fa fa-plus" /> Create
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </ToolPanel>
        {renderRecipesCards.length ? (
          <div className="card-columns">{renderRecipesCards}</div>
        ) : (
          <h3>No recipes found</h3>
        )}
      </div>
    </main>
  );
};

export default Recipes;
