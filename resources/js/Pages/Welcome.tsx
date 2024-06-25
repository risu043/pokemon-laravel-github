import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { useEffect, useState } from "react";

import { CgPokemon } from "react-icons/cg";
import {
    getAllFavoritePokemon,
    loadFavoritePokemonDetails,
} from "../utils/pokemon";
import { FavoritePokemonResponse, PokemonProperties } from "../utils/type";
import Loading from "../Components/Loading";
import LikeButton from "../Components/LikeButton";
import Modal from "../Components/Modal";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Welcome({ auth }: PageProps) {
    const getRandomIntegers = (): number[] => {
        const numbers = new Set<number>();
        while (numbers.size < 10) {
            const randomNum = Math.floor(Math.random() * 1000); // 0から1000のランダムな整数を生成
            numbers.add(randomNum); // Setを使用して重複を防ぐ
        }
        return Array.from(numbers); // Setを配列に変換して返す
    };

    const randomIntegers = getRandomIntegers();

    const [favoritePokemonData, setFavoritePokemonData] = useState<
        PokemonProperties[]
    >([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavoritePokemonData = async () => {
            const res: FavoritePokemonResponse[] = await Promise.all(
                randomIntegers.map(async (id: number) => {
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] =
        useState<PokemonProperties | null>(null);

    const openModal = (pokemon: PokemonProperties) => {
        setSelectedPokemon(pokemon);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPokemon(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="fixed left-0 top-0 object-cover h-dvh w-full"
                    src="images/Shape.svg"
                />
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#60a5fa] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center md:gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:justify-center lg:col-start-2">
                                <Link
                                    href="/"
                                    className="font-dela text-2xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-red to-blue"
                                >
                                    ポケモン図鑑
                                </Link>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            {loading ? (
                                <div className="h-80">
                                    <Loading />
                                </div>
                            ) : (
                                <div className="mb-20">
                                    <Swiper
                                        spaceBetween={50}
                                        centeredSlides={true}
                                        loop={true}
                                        slidesPerView={5}
                                        breakpoints={{
                                            320: {
                                                slidesPerView: 2,
                                                spaceBetween: 20,
                                            },
                                            480: {
                                                slidesPerView: 2,
                                                spaceBetween: 30,
                                            },
                                            640: {
                                                slidesPerView: 3,
                                                spaceBetween: 40,
                                            },
                                            768: {
                                                slidesPerView: 4,
                                                spaceBetween: 50,
                                            },
                                            1024: {
                                                slidesPerView: 5,
                                                spaceBetween: 50,
                                            },
                                        }}
                                    >
                                        {favoritePokemonData.map(
                                            (pokemon, i) => {
                                                return (
                                                    <SwiperSlide key={i}>
                                                        <div
                                                            className="shadow-lg rounded-2xl hover:shadow-xl transition-all p-4 bg-white my-8"
                                                            onClick={() =>
                                                                openModal(
                                                                    pokemon
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src={
                                                                    pokemon.thumbnail
                                                                }
                                                                alt={
                                                                    pokemon.name
                                                                }
                                                                className="w-full"
                                                                width="300px"
                                                                height="300px"
                                                            />
                                                            <h3 className="font-zenKaku text-center text-black text-xl">
                                                                {pokemon.name}
                                                            </h3>
                                                        </div>
                                                    </SwiperSlide>
                                                );
                                            }
                                        )}
                                    </Swiper>
                                    <Modal
                                        show={isModalOpen}
                                        maxWidth="sm"
                                        closeable={true}
                                        onClose={closeModal}
                                    >
                                        {selectedPokemon && (
                                            <div
                                                className="relative font-zenKaku p-4"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <button
                                                    className="close-button absolute top-5 right-5 w-10 h-10 rounded-full shadow-md text-gray-200 border-solid border border-gray-200 bg-white focus:outline-none"
                                                    onClick={closeModal}
                                                >
                                                    ×
                                                </button>
                                                <div>
                                                    <img
                                                        className=" w-full"
                                                        src={
                                                            selectedPokemon.image
                                                        }
                                                        width="300ox"
                                                        height="300px"
                                                        alt="{pokemon.name}"
                                                    />
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                    <h3 className="font-zenKaku text-2xl mb-2 font-black">
                                                        <span className="font-gill mr-2">
                                                            No.
                                                            {selectedPokemon.id}
                                                        </span>
                                                        {selectedPokemon.name}
                                                    </h3>
                                                    {auth.user && (
                                                        <LikeButton
                                                            pokemon={
                                                                selectedPokemon
                                                            }
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex">
                                                    <div>タイプ：</div>
                                                    {selectedPokemon.types.map(
                                                        (type) => {
                                                            return (
                                                                <div
                                                                    className="mr-2"
                                                                    key={type}
                                                                >
                                                                    {type}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                                <div>
                                                    <div>
                                                        <div>
                                                            <p>
                                                                おもさ：
                                                                <span className="tracking-widest">
                                                                    {selectedPokemon.weight /
                                                                        10}
                                                                    kg
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p>
                                                                たかさ：
                                                                <span className="tracking-widest">
                                                                    {selectedPokemon.height /
                                                                        10}
                                                                    m
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap mb-2">
                                                        <div>のうりょく：</div>
                                                        {selectedPokemon.abilities.map(
                                                            (ability) => {
                                                                return (
                                                                    <div
                                                                        className="mr-2"
                                                                        key={
                                                                            ability
                                                                        }
                                                                    >
                                                                        {
                                                                            ability
                                                                        }
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p>
                                                            {
                                                                selectedPokemon.text
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Modal>
                                </div>
                            )}

                            <div className="max-w-2xl mx-auto flex items-start gap-4 rounded-xl bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] mb-20">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                                    <CgPokemon className="text-red text-4xl" />
                                </div>

                                <div className="pt-3 sm:pt-5">
                                    <h2 className="text-xl font-semibold text-black dark:text-white">
                                        あそびかた
                                    </h2>

                                    <p className="my-4 text-sm/relaxed">
                                        いちらん、けんさく画面よりポケモンを探しておきにいり登録します。
                                        <br />
                                        おきにいり画面で登録したポケモンたちを眺めることができます。
                                        <br />
                                        他のユーザーのおきにいりポケモンをチェックしたり、
                                        <br />
                                        人気ポケモンランキングをチェックしたりして楽しみましょう！
                                    </p>
                                    <img
                                        className="rounded-xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.08)] mb-4"
                                        src="/images/friend.png"
                                        alt="おともだちページ"
                                    />
                                </div>
                            </div>
                            <div className="max-w-2xl mx-auto flex items-start gap-4 rounded-xl bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] mb-20">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                                    <CgPokemon className="text-red text-4xl" />
                                </div>

                                <div className="pt-3 sm:pt-5">
                                    <h2 className="text-xl font-semibold text-black dark:text-white">
                                        この図鑑について
                                    </h2>

                                    <p className="mt-4 text-sm/relaxed">
                                        ポケモンファンが作りました。PokeAPIよりデータを取得しています。
                                        <br />
                                        ユーザーはいつでもアカウント登録・削除が可能です。
                                        <br />
                                        登録されたユーザー情報は、ユーザーの図鑑利用のためだけに使用します。
                                        <br />
                                        図鑑の公開修了時にはユーザー情報を全て削除します。
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={route("register")}
                                className="bg-blue rounded-full px-16 py-4 text-white text-xl ring-1 ring-transparent transition hover:bg-white hover:text-blue focus:outline-none border-2 border-blue block w-fit mx-auto"
                            >
                                図鑑であそぶ
                            </Link>
                            <div className="">
                                <Link
                                    href={route("contact.request")}
                                    className="w-fit mx-auto block text-black mt-28 mb-8"
                                >
                                    お問い合わせ
                                </Link>
                            </div>
                        </main>

                        <footer className="mb-16 text-center text-sm text-black dark:text-white/70">
                            &copy; 2024 りす
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
