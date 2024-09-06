'use client'

import { useState } from "react"
import { FiEdit, FiX } from "react-icons/fi"

export default function FavoriteCard() {

    const [input, setInput] = useState<string>("");
    const [showInput, setShowInput] = useState<boolean>(false);
    const [GameName, setGameName] = useState<string>("");

    function HandleButton() {
        setShowInput(!showInput);

        if (input !== "") {
            setGameName(input)
        }


        setInput("");
    }
    return (
        <div className="w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex justify-between flex-col">
            {showInput ? (
                <div className="flex items-center justify-center gap-3">
                    <input
                        className="w-full rounded-md h-8 text-black px-2"
                        type="text"
                        value={input}
                        onChange={event => setInput(event.target.value)}
                    />
                    <button onClick={() => HandleButton()}>
                        <FiX size={24} color="#fff" />
                    </button>
                </div>
            ) : (
                <button
                    className="self-start hover:scale-110 duration-200 transition-all"
                    onClick={() => HandleButton()}
                >
                    <FiEdit size={24} color="#fff" />
                </button>
            )}


            {GameName && (
                <div>
                    <span>Jogo Favorito</span>
                    <p>{GameName}</p>
                </div>
            )}


            {!GameName && (
                <p className="font-bold text-white">Adicionar jogo</p>
            )}

        </div>
    )
}