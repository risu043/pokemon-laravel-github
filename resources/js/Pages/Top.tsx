import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getAllPokemon, loadPokemonDetails } from "..//utils/pokemon";
import { PokemonResponse, PokemonProperties } from "../utils/type";
import Card from "../Components/Card";
import Loading from "../Components/Loading";

function Top() {
    // 現在いるページのポケモンデータ
    const [items, setItems] = useState<PokemonProperties[]>([]);

    // 総ページ数
    const [pageCount, setPageCount] = useState<number>(0);

    // １ページあたりのポケモンの数
    let limit = 20;

    // データ取得の開始位置
    const [offset, setOffset] = useState(0);

    // 現在のページ番号
    const [currentPage, setCurrentPage] = useState(0);

    // 現在のページのポケモンデータが表示されるまでloading
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 現在のページのポケモンデータを取得
        const getCurrentPokemon = async (): Promise<void> => {
            setLoading(true);
            const res: PokemonResponse = await getAllPokemon(
                `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
            );
            console.log(res);

            const total = res.count;
            setPageCount(Math.ceil(total / limit));

            const pokemonPropaties = await loadPokemonDetails(res.results);
            setItems(pokemonPropaties);
            setLoading(false);
        };

        getCurrentPokemon();
    }, [offset]);

    // ページネーションをクリックした時の処理
    const handlePageClick = (data: { selected: number }): void => {
        // 現在のページ番号を更新
        setCurrentPage(data.selected);
        // 開始位置を更新、再レンダリング
        let newOffset: number = data.selected * limit;
        setOffset(newOffset);
    };

    return (
        <>
            <div className="App">
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <div className="container mx-auto w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 py-16 px-4">
                            {items.map((pokemon, i) => {
                                return <Card key={i} pokemon={pokemon} />;
                            })}
                        </div>
                        <div className="bg-gray-100 py-12">
                            <ReactPaginate
                                previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                pageCount={pageCount} // 総ページ数
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName={
                                    "pagination flex justify-center items-center gap-4 flex-wrap"
                                }
                                pageClassName={"page-item"}
                                pageLinkClassName={
                                    "page-link relative bg-white w-14 h-14 grid place-content-center rounded-full transition duration-700"
                                }
                                previousClassName={"previous-item"}
                                previousLinkClassName={"previous-link"}
                                nextClassName={"next-item"}
                                nextLinkClassName={"next-link"}
                                breakClassName={"break-item"}
                                breakLinkClassName={"break-link"}
                                activeClassName={"text-gray-300"}
                                forcePage={currentPage} // 現在のページ
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Top;
