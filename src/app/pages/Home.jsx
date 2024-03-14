'use client';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Home = () => {
    const [cep, setCep] = useState(null);
    const [cepView, setCepView] = useState(null);
    const [modalCEP, setModalCEP] = useState(false);
    const [info, setInfo] = useState({});

    async function fetchData() {
        // https://viacep.com.br/ws/01001000/json/
        const response = await fetch(
            `https://cep.awesomeapi.com.br/json/${cep}`
        );
        const jsonData = await response.json();
        setInfo(jsonData);
        console.log(jsonData);
    }

    const handleClear = () => {
        setCep(null);
        setInfo('');
        setCepView(null);
    };

    const handleAddNewCEP = () => {
        setModalCEP(!modalCEP);
    };

    const handleSendForm = (e) => {
        e.preventDefault();
        if (!cep) {
            alert('Digite algum CEP');
            return;
        }

        setCep(cep);
        setModalCEP(!modalCEP);
        fetchData();
        setCepView('Thing');
    };

    return (
        <main className="flex justify-center items-center text-white font-mono font-extrabold ">
            <div
                id="container"
                className="bg-[#BE9063] min-h-[400px] min-w-[400px] rounded-xl flex items-center justify-around m-4 p-3 flex-col"
            >
                <h1
                    id="h1-title"
                    className="text-3xl font-extrabold font-mono underline"
                >
                    Buscador de CEP
                </h1>
                <button
                    onClick={handleAddNewCEP}
                    className="bg-orange-600 rounded-md p-1 text-md"
                >
                    Buscar novo CEP
                </button>

                {cepView ? (
                    <div
                        id="info"
                        className="text-center tracking-tight text-xl"
                    >
                        <h2 id="cep" className="text-2xl mb-3 underline text-[#132226]">
                            CEP: {info.cep} {info.code}
                        </h2>
                        <h3>
                            Cidade: {info.city} - {info.state}
                        </h3>
                        <h3>Bairro: {info.district}</h3>
                        <h3>Rua: {info.address_name}</h3>
                    </div>
                ) : (
                    <div
                        id="info"
                        className="text-center tracking-tight text-xl"
                    >
                        <h2 id="cep" className="text-2xl mb-3 text-[#132226]">
                        Nenhum CEP digitado
                        </h2>
                        <h3>ㅤ</h3>
                        <h3>ㅤ</h3>
                        <h3>ㅤ </h3>
                    </div>
                )}

                <div>
                    <button
                        onClick={handleClear}
                        className="bg-orange-600 p-1 rounded-md text-md"
                    >
                        Limpar
                    </button>
                </div>
            </div>

            {modalCEP ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,0.7)] text-center">
                    <div
                        id="container-modal"
                        className="min-h-[200px] min-w-[400px] bg-[#BE9063] m-4 rounded-xl inline-block relative"
                    >
                        <form
                            onSubmit={handleSendForm}
                            className="flex items-center flex-col gap-[20px] justify-center absolute top-0 left-0 right-0 bottom-0"
                        >
                            <div
                                id="div"
                                className="bg-[#132226] p-2 m-2 rounded-md flex justify-center items-center"
                            >
                                <input
                                    type="search"
                                    className="text-white outline-none rounded-none bg-[#132226] mr-[5px] placeholder:text-[#ccc] placeholder:text-[14px]"
                                    placeholder="Digite um CEP..."
                                    onChange={(e) => setCep(e.target.value)}
                                />
                                <button type="submit" className="">
                                    <FaSearch size={20} />
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="bg-orange-600 p-1 rounded-md text-md"
                            >
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="hidden"></div>
            )}
        </main>
    );
};

export default Home;
