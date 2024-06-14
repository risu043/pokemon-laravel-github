import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { CardProps } from "../utils/type";

const getCSRFToken = (): string | null => {
    const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
    if (!csrfTokenElement) {
        console.error("CSRFトークンが見つかりません");
        return null;
    }
    const csrfToken = csrfTokenElement.getAttribute("content");
    if (!csrfToken) {
        console.error("CSRFトークンが無効です");
        return null;
    }
    return csrfToken;
};

const LikeButton: React.FC<CardProps> = ({ pokemon }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const checkFavorite = async () => {
            const csrfToken = getCSRFToken();
            if (!csrfToken) return;

            try {
                const response = await fetch(route("favorites.check"), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: JSON.stringify({ pokemon_id: pokemon.id }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setLiked(data.isFavorite);
                } else {
                    console.error("お気に入り状態の確認に失敗しました");
                }
            } catch (error) {
                console.error("エラー:", error);
            }
        };

        checkFavorite();
    }, [pokemon.id]);

    const like = async (e: React.FormEvent) => {
        e.preventDefault();
        const csrfToken = getCSRFToken();
        if (!csrfToken) return;

        try {
            // お気に入りの数を取得し、上限を20匹とする
            const countResponse = await fetch(route("favorites.count"), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
            });

            if (countResponse.ok) {
                const countData = await countResponse.json();
                if (countData.count >= 20) {
                    alert("お気に入り登録は20匹までです");
                    return;
                }
            } else {
                console.error("お気に入り数の取得に失敗しました");
                return;
            }

            // お気に入り登録
            const response = await fetch(route("favorites.store"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify({ pokemon_id: pokemon.id }),
            });

            if (response.ok) {
                setLiked(true);
            } else {
                console.error("お気に入り登録に失敗しました");
            }
        } catch (error) {
            console.error("エラー:", error);
        }
    };

    const unlike = async (e: React.FormEvent) => {
        e.preventDefault();
        const csrfToken = getCSRFToken();
        if (!csrfToken) return;

        try {
            const response = await fetch(
                route("favorites.destroy", pokemon.id),
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: JSON.stringify({ pokemon_id: pokemon.id }),
                }
            );

            if (response.ok) {
                setLiked(false);
            } else {
                console.error("お気に入り削除に失敗しました");
            }
        } catch (error) {
            console.error("エラー:", error);
        }
    };

    return (
        <>
            <form onSubmit={liked ? unlike : like}>
                <button type="submit">
                    <FaHeart
                        className={`text-2xl transition-all mb-1 ${
                            liked
                                ? "text-rose-500 animate-pulse"
                                : "text-gray-300"
                        }`}
                    />
                </button>
            </form>
        </>
    );
};

export default LikeButton;
