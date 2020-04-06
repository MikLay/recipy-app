import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import api from "../../../api/api";
import {CATEGORIES} from "../../../constants/entity_config";

const RecipeCard = props => {
  const { recipe } = props;
  const history = useHistory();

  return (
    <div className="card">
      <img src={recipe.picture} className="card-img-top" alt={recipe.name} />
      <div className="card-body">
        <Link className="card-title" to={"/recipes/" + recipe.id}>
          <h5 className="card-title">{recipe.name}</h5>
        </Link>
        <p className="card-text">{recipe.shortDesc}</p>
          <small>{recipe.category}</small>
      </div>
      <div className="card-footer justify-content-center align-items-center">
        <div className="text-center">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary btn-md"
              onClick={() => history.push("/edit/" + recipe.id)}
            >
              <i className="fa fa-edit" /> Edit
            </button>
            <button
              type="button"
              className="btn btn-danger btn-md"
              onClick={() => {
                api.deleteRecipe(recipe.id);
                history.push("/recipes");
              }}
            >
              Delete <i className="fa fa-trash" />
            </button>
          </div>
        </div>
        <div className="text-center">
          <small className="text-muted" style={{ alignSelf: "right" }}>
            {recipe.createDate}
          </small>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
