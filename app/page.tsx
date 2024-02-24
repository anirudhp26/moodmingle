"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
	const cards = [
		{ id: 1, title: "/assets/overthinking.jpg", name: "overthinking" },
		{ id: 2, title: "/assets/fear.png", name: "fear" },
		{ id: 3, title: "/assets/focus.jpg", name: "focus" },
		{ id: 4, title: "/assets/loneliness.png", name: "loneliness" },
		{ id: 5, title: "/assets/anxiety.png", name: "anxiety" },
		{ id: 6, title: "/assets/sad.png", name: "sad" },
		{ id: 7, title: "/assets/confusion.jpg", name: "confusion" },
	];
  const router = useRouter();
  const handleRedirect = async (id: number) => {
    console.log(cards[id-1].name);
    const res = await fetch(`https://solutionchallenge.vercel.app/topic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({topic: cards[id-1].name})
    }).then(async (response: any) => {
      const res = await response.json();
      if (res.status === 200) {
        router.push(res.link);
      } else {
        toast.error(res.message)
      }
    });
  }

	return (
		<div className="flex justify-between w-[100vw] bg-black h-[100vh] flex-col">
      <ToastContainer />
			<p className="text-white h-auto text-4xl font-bold mx-auto mt-6 font-mono">
				MoodMingle
			</p>
			<div className="flex h-[80vh] justify-center flex-wrap mt-4">
				{cards.map((card) => (
					<div
						key={card.id}
            onClick={() => handleRedirect(card.id)}
						className="bg-white min-w-[200px] rounded-lg shadow-lg p-4 my-4 mx-8 w-64 h-64 transition duration-300 ease-in-out transform hover:scale-105"
					>
						<Image src={card.title} alt="" width={100} height={100} className="w-[90%] h-[90%]" />
            <p className="h-[10%] text-center items-center text-black font-mono font-bold">{card.name}</p>
          </div>
				))}
			</div>
		</div>
	);
}
