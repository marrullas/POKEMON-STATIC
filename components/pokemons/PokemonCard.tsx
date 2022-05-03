import { useRouter } from 'next/router';
import { Card, Grid, Row, Text } from '@nextui-org/react';

import { SmallPokemon } from "../../interfaces"
import { NextPage } from 'next';


interface Props { 
    pokemon: SmallPokemon
}

export const PokemonCard: NextPage<Props>= ({pokemon}) => {

  const router = useRouter();

  const onClick = () => {

    router.push(`/pokemon/${pokemon.id}`);

  }

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
    <Card 
    hoverable 
    
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
