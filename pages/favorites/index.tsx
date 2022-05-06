import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Text, Image, Grid, Card } from '@nextui-org/react';

import { Layout } from "../../components/layouts"
import { NoFavorites } from '../../components/ui/';
import { localFavorites } from '../../utils';
import { FavoritesPokemons } from '../../components/pokemons';


export const FavoritesPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {

    setFavoritePokemons( localFavorites.pokemons());

  }, [])


  


  return (

        <Layout title='Pokemones favoritos'>

          { 
            favoritePokemons.length === 0
             ? <NoFavorites />
             : (
               <FavoritesPokemons pokemons={favoritePokemons} />
             )
          }
    
            
            

        </Layout>
  ) 
}


export default FavoritesPage;