
import { GetStaticProps } from 'next'
import { NextPage } from 'next'
import { Grid} from '@nextui-org/react';


import { Layout } from '../components/layouts/';
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemons';
import { localFavorites } from '../utils';

interface Props { 
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({pokemons}) => {

  //console.log(pokemons);
  // let pkFav:number[] = [];
  // useEffect(() => {

  //   pkFav =  localFavorites.pokemons();

  // }, [])
  
  return (
    <Layout title='Listado de pokemones'>

      <Grid.Container gap={2} justify='flex-start'>
        { 
          pokemons.map((pokemon) =>(

            <PokemonCard key = {pokemon.id} pokemon = {pokemon} isFavorite = {localFavorites.existInFavorites(pokemon.id)}/>

            // <Grid xs={6} sm={3} md={2} xl={1} key={id}>
            //  <Card hoverable clickable>
            //    <Card.Body>
            //       <Card.Image
            //       src={img}
            //       width="100%"
            //       height={140}
            //       />
            //    </Card.Body>
            //    <Card.Footer>
            //      <Row justify='space-between'>
            //         <Text transform='capitalize'>{name}</Text>
            //         <Text>#{id}</Text>
            //      </Row>
            //    </Card.Footer>

            //  </Card>
            // </Grid>
          ))
        
        }

      </Grid.Container>
    </Layout>
  )
}



export const getStaticProps: GetStaticProps = async (ctx) => {

  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  //console.log(data.results);
  
  const pokemons: SmallPokemon[] = data.results.map((poke)=>({
   
   ...poke,
    id:parseInt(poke.url.replace('https://pokeapi.co/api/v2/pokemon/','').replace('/', '')),
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${parseInt(poke.url.replace('https://pokeapi.co/api/v2/pokemon/','').replace('/', ''))}.svg`,

  }));

  //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg

  return {
    props: {
      pokemons: pokemons,
    }
  }
}

export default HomePage;
