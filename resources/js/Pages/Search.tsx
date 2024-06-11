import React from "react";
import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "../types";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
    getAllPokemon,
    getPokemon,
    loadPokemonDetails,
} from "../utils/pokemon";
import { Names, PokemonProperties } from "../utils/type";
import Card from "../Components/Card";
import "./Search.css";

export default function Search({ auth }: PageProps) {
    // 全ポケモンの英名・和名
    const [names, setNames] = useState<Names[]>([]);

    // formのinputの値
    const [title, setTitle] = useState<string>("");

    // 検索結果
    const [items, setItems] = useState<PokemonProperties[]>([]);

    // 検索ボタンをおしてから結果が表示されるまでloading
    const [loading, setLoading] = useState(false);

    const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setTitle(e.target.value);
    };

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
        e
    ) => {
        e.preventDefault();

        if (title === "") {
            return;
        }

        setLoading(true);

        let translate = names.filter((pokemon) => pokemon.jaName.match(title));
        let enNames = translate.map((pokemon) => pokemon.name);

        const res = await getAllPokemon(
            "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        );

        let targetData = res.results.filter((pokemon) => {
            return enNames.some((name) => pokemon.name.includes(name));
        });

        const _pokemonDetailsData = await loadPokemonDetails(targetData);
        setItems(_pokemonDetailsData);
        setTitle("");
        setLoading(false);
    };

    useEffect(() => {
        const pokemonNames = async (): Promise<void> => {
            const res = await getAllPokemon(
                "https://pokeapi.co/api/v2/pokemon-species?limit=10000&offset=0"
            );
            let _pokemonNameData = await Promise.all(
                res.results.map((pokemon) => {
                    let pokemonRecord = getPokemon(pokemon.url);
                    return pokemonRecord;
                })
            );
            let _pokemonNames = _pokemonNameData.map((pokemon) => {
                let jaName = pokemon.names.find(
                    (entry) => entry.language.name === "ja-Hrkt"
                )!.name;

                return {
                    name: pokemon.name,
                    jaName: jaName,
                };
            });

            setNames(_pokemonNames);
        };
        pokemonNames();
    }, []);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="けんさく" />

            <div className="container">
                <div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="flex justify-center my-12">
                            <input
                                name="title"
                                value={title}
                                className="form-input focus:outline-none focus:ring-0  focus:border-gray-300"
                                placeholder="ポケモンの名前を入力"
                                onChange={handleTitleChange}
                            />
                            <button
                                className={`form-button ${
                                    title === "" ? "disabled" : "able"
                                }`}
                                disabled={title === ""}
                            >
                                <FaSearch />
                            </button>
                        </div>
                    </form>
                </div>
                {loading ? (
                    <div className="loading"></div>
                ) : (
                    <div className="pokemonCardContainer container mx-auto w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 pb-16 px-4">
                        {items.map((pokemon, i) => {
                            return <Card key={i} pokemon={pokemon} />;
                        })}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
