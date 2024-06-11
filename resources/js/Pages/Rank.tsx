import React from "react";
import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FavoritePageProps } from "../types";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import {
    getAllFavoritePokemon,
    loadFavoritePokemonDetails,
} from "../utils/pokemon";
import {
    FavoritePokemonResponse,
    PokemonProperties,
    PokemonPropertiesWithCount,
} from "../utils/type";

export default function Rank({ auth, favorites }: FavoritePageProps) {
    const data = favorites;

    // pokemon_idの出現回数をカウント
    const countPokemonIds = data.reduce(
        (acc: Record<number, number>, entry) => {
            acc[entry.pokemon_id] = (acc[entry.pokemon_id] || 0) + 1;
            return acc;
        },
        {} as Record<number, number>
    );

    // カウント結果をソート
    const sortedPokemonIds = Object.entries(countPokemonIds).sort(
        (a: [string, number], b: [string, number]) => b[1] - a[1]
    );

    // ランキングを出力
    const ranking = sortedPokemonIds.map(([pokemon_id, count]) => ({
        pokemon_id: Number(pokemon_id),
        count,
    }));

    console.log(ranking);

    const [favoritePokemonData, setFavoritePokemonData] = useState<
        PokemonPropertiesWithCount[]
    >([]);
    const [loading, setLoading] = useState(true);

    const rankingPokemonIds = ranking.map((favorite) => favorite.pokemon_id);

    const slicedRankingPokemonIds = rankingPokemonIds.slice(0, 5);

    console.log(slicedRankingPokemonIds);

    useEffect(() => {
        const fetchFavoritePokemonData = async () => {
            const res: FavoritePokemonResponse[] = await Promise.all(
                slicedRankingPokemonIds.map(async (id: number) => {
                    return await getAllFavoritePokemon(
                        `https://pokeapi.co/api/v2/pokemon/${id}`
                    );
                })
            );
            const data: PokemonProperties[] = await loadFavoritePokemonDetails(
                res
            );
            // ポケモンデータにカウントを追加
            const dataWithCount: PokemonPropertiesWithCount[] = data.map(
                (pokemon) => {
                    const count =
                        ranking.find((rank) => rank.pokemon_id === pokemon.id)
                            ?.count || 0;
                    return { ...pokemon, count };
                }
            );
            setFavoritePokemonData(dataWithCount);
            setLoading(false);
        };

        fetchFavoritePokemonData();
    }, []);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="けんさく" />

            <div className="container">
                {loading ? (
                    <div className="loading"></div>
                ) : (
                    <div className="pokemonCardContainer container mx-auto w-fit max-w-4xl p-16">
                        {favoritePokemonData.map((pokemon, i) => {
                            return (
                                <li
                                    key={i}
                                    className="list-decimal text-2xl p-4 rounded-2xl shadow-md mb-8"
                                >
                                    {pokemon.name}{" "}
                                    <div className="flex items-center gap-2 text-xl">
                                        <FaHeart className="text-red" />
                                        {pokemon.count}
                                    </div>
                                    <img
                                        src={pokemon.image}
                                        width="300ox"
                                        height="300px"
                                        alt={pokemon.name}
                                    />
                                </li>
                            );
                        })}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
