import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import CardWithoutLikeButton from "../../Components/CardWithoutLikeButton";
import Loading from "../../Components/Loading";
import { Head } from "@inertiajs/react";
import { UserShowPageProps } from "../../types";
import { FavoritePokemonResponse, PokemonProperties } from "../../utils/type";
import {
    getAllFavoritePokemon,
    loadFavoritePokemonDetails,
} from "../../utils/pokemon";

export default function Show({ auth, user, favorites }: UserShowPageProps) {
    const [favoritePokemonData, setFavoritePokemonData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const userImage = user.profile_photo_path
        ? `/storage/${user.profile_photo_path}`
        : "/images/user_image.png";

    useEffect(() => {
        if (favorites) {
            const favoritePokemonIds = favorites.map(
                (pokemon) => pokemon.pokemon_id
            );

            const fetchFavoritePokemonData = async () => {
                const res: FavoritePokemonResponse[] = await Promise.all(
                    favoritePokemonIds.map(async (id: number) => {
                        return await getAllFavoritePokemon(
                            `https://pokeapi.co/api/v2/pokemon/${id}`
                        );
                    })
                );
                const data: PokemonProperties[] =
                    await loadFavoritePokemonDetails(res);
                setFavoritePokemonData(data);
                setLoading(false);
            };

            fetchFavoritePokemonData();
        }
    }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="おともだち" />
            <div>
                <div className="w-fit mx-auto text-center p-16">
                    <img
                        className=" w-16 h-16 rounded-full object-cover border-none mb-2"
                        src={userImage}
                        alt={user.name}
                    />
                    <h3 className="font-zenKaku">{user.name}</h3>
                </div>
                {favorites && favoritePokemonData.length > 0 ? (
                    <div>
                        <p className="text-center">
                            {user.name}さんのおきにいり
                        </p>
                        {loading ? (
                            <div className="h-80">
                                <Loading />
                            </div>
                        ) : (
                            <div className="pokemonCardContainer container mx-auto w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 py-16 px-4">
                                {favoritePokemonData.map((pokemon, i) => {
                                    return (
                                        <CardWithoutLikeButton
                                            key={i}
                                            pokemon={pokemon}
                                            user={user}
                                            authUser={auth.user}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-center">
                        まだ{user.name}さんのおきにいりはありません
                    </p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
