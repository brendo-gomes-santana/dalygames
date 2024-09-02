import { GameProps } from "@/utils/types/game";
import { redirect } from "next/navigation";
import Image from 'next/image'

import Container from "@/components/container";
import Label from "./components/label";
import GameCard from "@/components/gameCard";
import { Metadata } from "next";

interface PropsParams {
    params:{
        id: string,
    }
}

export async function generateMetadata({ params }: PropsParams): Promise<Metadata>{
    try{
        const response: GameProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`, { cache:'no-store' })
        .then((res) => res.json())
        .catch(() => {
            return{
                title:'DalyGames - descubrar jogos incríveis para se divertir'
            }
        })


        return {
            title: response.title,
            description: `${response.description.slice(0,100)}...`,
            openGraph: {
                title: response.title,
                images: [response.image_url]
            },
            robots: {
                index: true,
                follow: true,
                nocache: true,
                googleBot: {
                  index: true,
                  follow: true,
                  noimageindex: true
                }
              }
        }


    }catch(err){
        return {
            title: 'DalyGames - descubrar jogos incríveis para se divertir'
        }
    }
}


async function getData(id: string):Promise<GameProps | null>{

    try{
        const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, { cache:'no-store' });
        return response.json();

    }catch(err){
        console.log(err);
        return null
    }

}
async function getGameDay():Promise<GameProps | null>{
    try{

        const response = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { cache: 'no-store' })

        return response.json()

    }catch(err){
        console.log(err);
        return null
    }
}
export default async function Game({ params: { id } }: PropsParams){
    
    const game:GameProps | null = await getData(id);
    const game_day:GameProps | null = await getGameDay()

    if(!game){
        redirect('/')
    }

    return(
        <main className="w-full text-black">
            <div className="bg-black h-80 sm:-96 w-full relative">
                <Image
                    src={game.image_url}
                    alt={game.title}
                    priority={true}
                    fill={true}
                    className="object-cover w-full h-80 sm:h-96 opacity-80"
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
             
                />
            </div>
            <Container>
                <h1 className="font-bold text-xl my-4">{game.title}</h1>
                <p>{game.description}</p>

                <h2 className="font-bold text-lg mt-8 mb-2">Plataformas</h2>
                <div className="flex gap-2 flex-wrap">
                    {game?.platforms.map((item) => {
                        return(
                            <Label name={item} key={item}/>
                        )
                    })}
                </div>

                <h2 className="font-bold text-lg mt-8 mb-2">Categorias</h2>
                <div className="flex gap-2 flex-wrap">
                    {game?.categories.map((item) => {
                        return(
                            <Label name={item} key={item}/>
                        )
                    })}
                </div>

                <p className="mt-7 mb-2"><strong>Data de lançamento:</strong> {game.release}</p>

                <h2 className="font-bold text-lg mt-8 mb-2">Jogo recomendado:</h2>
                <div className="flex">
                    <div className="flex-grow">
                        <GameCard data={game_day}/>
                    </div>
                </div>
            </Container>
        </main>
    )
}