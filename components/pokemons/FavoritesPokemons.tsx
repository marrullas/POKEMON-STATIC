import { Grid, Card } from "@nextui-org/react";
import { FavoriteCardPokemon } from './';
import { FC } from 'react';

interface Props {
  pokemons: number[];
}


export const FavoritesPokemons: FC<Props> = ({pokemons}) => {
  return (
    <Grid.Container gap={2} direction='row' justify="flex-start">
    {
      pokemons.map(id =>(
        <Grid xs={6} sm={3} md={2} xl={1} key={id}>
            <FavoriteCardPokemon pokemonId={id} key={id}/>

        </Grid>

      ))
    }

  </Grid.Container>
  )
}
