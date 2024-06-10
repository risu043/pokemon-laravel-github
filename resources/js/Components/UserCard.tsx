import React, { useState, useEffect } from "react";
import { UserCardProps } from "../types/index";
import { FavoritePokemonResponse, PokemonProperties } from "../utils/type";
import {
    getAllFavoritePokemon,
    loadFavoritePokemonDetails,
} from "../utils/pokemon.ts";

const UserCard: React.FC<UserCardProps> = ({ user, favorites }) => {
    const userImage = user.profile_photo_path
        ? `/storage/${user.profile_photo_path}`
        : "/images/user_image.png";

    const [favoritePokemonData, setFavoritePokemonData] = useState<
        PokemonProperties[]
    >([]);

    const userFavorites = favorites.filter(
        (favorite) => favorite.user_id === user.id
    );
    const slicedUserFavorites = userFavorites.slice(0, 6);

    const favoritePokemonIds = slicedUserFavorites.map(
        (favorite) => favorite.pokemon_id
    );

    console.log(favoritePokemonIds);

    useEffect(() => {
        const fetchFavoritePokemonData = async () => {
            const res: FavoritePokemonResponse[] = await Promise.all(
                favoritePokemonIds.map(async (id: number) => {
                    return await getAllFavoritePokemon(
                        `https://pokeapi.co/api/v2/pokemon/${id}`
                    );
                })
            );
            const data: PokemonProperties[] = await loadFavoritePokemonDetails(
                res
            );
            setFavoritePokemonData(data);
        };

        fetchFavoritePokemonData();
    }, []);

    return (
        <a href={route("users.show", { user: user.id })}>
            <div className="p-4 rounded-2xl shadow-md mb-8 hover:shadow-xl transition-all">
                <div className="flex gap-4 md:gap-10">
                    <div>
                        <img
                            className="w-16 h-16 rounded-full object-cover border-none mb-2"
                            src={userImage}
                            alt={user.name}
                        />
                        <h3 className="font-zenKaku w-16">{user.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {favoritePokemonData.map((pokemon) => (
                            <div key={pokemon.id}>
                                <img
                                    src={pokemon.thumbnail}
                                    alt={pokemon.name}
                                    className=" w-16 h-16 rounded-full object-cover border-none shadow-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </a>
    );
};

export default UserCard;
