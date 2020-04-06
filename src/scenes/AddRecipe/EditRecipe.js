import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router";
import api from "../../api/api";
import {useForm} from 'react-hook-form';
import Button from "react-bootstrap/Button";
import styled from "styled-components";


const EditForm = styled.div`
margin-top: 40px;
margin-bottom: 50px;
`;

const EditRecipe = () => {
    const [recipe, setRecipe] = useState(null);
    const id = useLocation().pathname.substring("/edit/".length);
    const history = useHistory();

    useEffect(() => {
        api.fetchRecipe(id).then(setRecipe)
    }, []);

    const {register, handleSubmit} = useForm();

    if (!recipe) {
        return <h3>Loading...</h3>;
    }

    const onSubmit = (data) => {
        api.updateRecipe({...recipe, ...data});
        history.push('/recipes');
    };

    return (
        <div className="container" style={{}}>
            <EditForm>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Recipe name</label>
                        <input name="name" className="form-control" type="text" placeholder="Name"
                               defaultValue={recipe.name} ref={register}/>
                    </div>

                    <div className="form-group">
                        <label>Short Description</label>
                        <input name="shortDesc" className="form-control" type="text" placeholder=""
                               defaultValue={recipe.shortDesc} ref={register}/>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="longDesc" className="form-control" defaultValue={recipe.longDesc}
                                  ref={register} rows={4}/>
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <input name="category" className="form-control" type="text" defaultValue={recipe.category}
                               ref={register}/>
                    </div>


                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                    <Button variant="dark" type="reset" onClick={() =>
                        history.push('/recipes')}>
                        Reset
                    </Button>
                </form>
            </EditForm>
        </div>
    );
};

export default EditRecipe;