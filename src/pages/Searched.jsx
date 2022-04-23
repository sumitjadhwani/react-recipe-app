import React from 'react'
import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom'


function Searched() {
  const [searchedRecipies, setSearchedRecipies] = useState([])
  let params = useParams();

  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=9&query=${name}`,
    )
    const recipies = await data.json()
    setSearchedRecipies(recipies.results)
  }

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);
  

  return <Grid>
    {searchedRecipies.map((item) => {
      return(
        <Card key={item.id}>
          <Link to={'/recipe/' + item.id}>
          <img src={item.image} alt={item.title} />
          <h4>{item.title}</h4>
          </Link>
        </Card>
      )
    })}
  </Grid>
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 3rem;
`

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rems;
  }
`

export default Searched
