import React from "react";
import LikeButton from "./LikeButton";
import { useState, useEffect } from "react";
import { CardWithoutLikeButtonProps } from "../types";
import Modal from "../Components/Modal";

const Card: React.FC<CardWithoutLikeButtonProps> = ({
    pokemon,
    user,
    authUser,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div
                className="shadow-lg rounded-2xl hover:shadow-xl transition-all p-4"
                onClick={openModal}
            >
                <div>
                    <img
                        className=" w-full"
                        src={pokemon.thumbnail}
                        width="160ox"
                        height="160px"
                        alt="{pokemon.name}"
                    />
                </div>
                <h3 className="font-zenKaku text-center text-2xl mb-4">
                    {pokemon.name}
                </h3>
            </div>
            <Modal
                show={isModalOpen}
                maxWidth="sm"
                closeable={true}
                onClose={closeModal}
            >
                <div
                    className="relative font-zenKaku p-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="absolute top-5 right-5 w-10 h-10 rounded-full shadow-md text-gray-200 border-solid border border-gray-200 bg-white focus:outline-none"
                        onClick={closeModal}
                    >
                        ×
                    </button>
                    <div>
                        <img
                            className=" w-full"
                            src={pokemon.image}
                            width="300ox"
                            height="300px"
                            alt="{pokemon.name}"
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <h3 className="font-zenKaku text-2xl mb-2 font-black">
                            <span className="font-gill mr-2">
                                No.{pokemon.id}
                            </span>
                            {pokemon.name}
                        </h3>
                        {user.id === authUser.id && (
                            <LikeButton pokemon={pokemon} />
                        )}
                    </div>
                    <div className="flex">
                        <div>タイプ：</div>
                        {pokemon.types.map((type) => {
                            return (
                                <div className="mr-2" key={type}>
                                    {type}
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        <div>
                            <div>
                                <p>
                                    おもさ：
                                    <span className="tracking-widest">
                                        {pokemon.weight / 10}kg
                                    </span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    たかさ：
                                    <span className="tracking-widest">
                                        {pokemon.height / 10}m
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-2">
                            <div>のうりょく：</div>
                            {pokemon.abilities.map((ability) => {
                                return (
                                    <div className="mr-2" key={ability}>
                                        {ability}
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <p>{pokemon.text}</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Card;
