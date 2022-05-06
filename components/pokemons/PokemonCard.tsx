import { useRouter } from 'next/router';
import { Card, Grid, Row, Text } from '@nextui-org/react';

import { SmallPokemon } from "../../interfaces"
import { NextPage } from 'next';


interface Props { 
    pokemon: SmallPokemon,
    isFavorite?: boolean
}

export const PokemonCard: NextPage<Props>= ({pokemon, isFavorite=false}) => {

  //console.log(isFavorite);

  const router = useRouter();

  const onClick = () => {

    router.push(`/name/${pokemon.name}`);

  }

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
    <Card 
    hoverable 
    color = {isFavorite ? "gradient" : "default"}
    onClick={onClick}
    >
      <Card.Body>
         <Card.Image
         src={pokemon.img}
         width="100%"
         height={140}
         />
      </Card.Body>
      <Card.Footer>
        <Row justify='space-between'>
           <Text transform='capitalize'>{pokemon.name}</Text>
           <Text>#{pokemon.id}</Text>
        </Row>
      </Card.Footer>

    </Card>
   </Grid>
  )
}
