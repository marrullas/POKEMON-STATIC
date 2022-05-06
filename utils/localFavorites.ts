

const toggleFavorite = (id: number) => {

    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    if(favorites.includes(id)){//Si viene el id es porque ya esta en el arreglo

        favorites = favorites.filter( pokeId => pokeId !== id ); //saca el id que venga del arreglo

    }else{
        favorites.push( id );
    }

    localStorage.setItem('favorites',JSON.stringify(favorites)); 
}

const existInFavorites = (id: number): boolean =>{

    if (typeof window === 'undefined') return false; //verifica que esto se ejecute del lado del cliente cuando exista el localStorage en caso contrario retorna falso

    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

    return favorites.includes(id);
}

const pokemons = (): number[] => {
    if (typeof window === 'undefined') return [];
    return JSON.parse( localStorage.getItem('favorites') || '[]');
}

const exportedFunctions = {toggleFavorite, existInFavorites, pokemons}; // se asigna en una variable para evitar mesaje "Assign object to a variable before exporting as module default eslint"

export default exportedFunctions;