import { useEffect, useState } from "react";

import { Button, Card, Container, Grid, Row, Text, Image } from "@nextui-org/react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";

import confetti from 'canvas-confetti';

import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";
import { PokemonListResponse } from '../../interfaces/pokemon-list';

interface Props {
  pokemon: Pokemon;
}

export const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id));


  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if(!isInFavorites){

      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        }
      })
    }
  }

  return (

    


    <Layout title={pokemon.name}>
      <Grid.Container gap={2} justify="flex-start" css={{marginTop: '5px'}}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{padding: '30px'}}>
            <Card.Body>
              <Card.Image src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'} 
              alt={pokemon.name}
              width="100%" height={200} />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}> 
              <Card>
                <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
                  <Text h1 transform='capitalize'>{pokemon.name}</Text>
                  <Button
                  color="gradient"
                  ghost={ !isInFavorites }
                  onClick={onToggleFavorite}
                  >
                    { isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
                                        
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Text size={30}>Sprites:</Text>
                  <Container direction="row" display="flex" gap= {0}>
                    <Image
                      src = {pokemon.sprites.front_default}
                      alt = { pokemon.name }
                      width= {100}
                      height= {100}

                    />
                    <Image
                      src = {pokemon.sprites.back_default}
                      alt = { pokemon.name }
                      width= {100}
                      height= {100}

                    />
                    <Image
                      src = {pokemon.sprites.front_shiny}
                      alt = { pokemon.name }
                      width= {100}
                      height= {100}

                    />
                    <Image
                      src = {pokemon.sprites.back_shiny}
                      alt = { pokemon.name }
                      width= {100}
                      height= {100}

                    />
                  </Container>
                </Card.Body>
              </Card>
            </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  //const { data } = await  // your fetch function here

  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemon151: string[] = data.results.map(pokemon => pokemon.name);

  return {
    paths: pokemon151.map((name) => ({
      params: { name },
    })),
    fallback: false, //hace que si no existe la rura retorne 404
  };
};
//recibe los argumentos de las rutas generadas
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };


  return {
    props: {
      pokemon: await getPokemonInfo( name )
    },
  };
};

export default PokemonByNamePage ;
