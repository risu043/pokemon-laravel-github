import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Card from "../../Components/Card";
import Loading from "../../Components/Loading";
import { FavoritePageProps } from "../../types";
import { FavoritePokemonResponse, PokemonProperties } from "../../utils/type";
import {
    getAllFavoritePokemon,
    loadFavoritePokemonDetails,
} from "../../utils/pokemon";
// import { Inertia } from "@inertiajs/inertia";

export default function Index({ auth, favorites }: FavoritePageProps) {
    const [favoritePokemonData, setFavoritePokemonData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const favoritePokemonIds = favorites.map(
            (favorite) => favorite.pokemon_id
        );

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
            setLoading(false);
        };

        fetchFavoritePokemonData();
    }, []);

    // function handleClearFavorites() {
    //     Inertia.post(route("favorites.clear"));
    // }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="おきにいり" />
            {loading ? (
                <div className="h-80">
                    <Loading />
                </div>
            ) : (
                <>
                    <div className="pokemonCardContainer container mx-auto w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 py-16 px-4">
                        {favoritePokemonData.map((pokemon, i) => {
                            return <Card key={i} pokemon={pokemon} />;
                        })}
                    </div>
                    <div className="w-fit mx-auto mb-16">
                        <p className="mb-8">20匹までおきにいり登録できます。</p>
                        {favoritePokemonData.length > 0 ? (
                            <Link
                                className="bg-blue px-12 py-4 text-white rounded-full block"
                                href={route("favorites.clear")}
                            >
                                おきにいりをリセット
                            </Link>
                        ) : (
                            <p>まだおきにいりのポケモンがいません。</p>
                        )}
                    </div>
                </>
            )}
        </AuthenticatedLayout>
    );
}
