import { Button } from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-white flex flex-col justify-center items-center h-[44vh] gap-4 px-4">
        <div className="text-4xl md:text-6xl font-bold flex">Feed a Cat <span><img src="logo.gif" className="w-[40] md:w-[65]" loading="lazy" /></span></div>
        <p className="text-xs md:text-base p-3 sm:p-5 text-center text-gray-300 max-w-[90%] sm:max-w-[70%]">Feed a Cat is a fun and heartwarming platform where you can create a profile for a cat in need, share their story, and let the world support them—one purr and donation at a time. Every click makes a cat purr!</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={"/login"}><button className={Button}>Begin Your Purr-sona</button></Link>
          <Link href="/allusers"><button className={Button}>Purr-sonalities</button></Link>
          <Link href="/about"><button className={Button}>The Fur-ther Read</button></Link>

        </div>

      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="container text-white mx-auto py-5 sm:py-10 lg:py-15 px-4">
        <h2 className="text-3xl font-bold text-center sm:mb-6 lg:mb-14">Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-8 gap-4 p-4">
          {/* Feature 1: Cat Account Registration */}
          <div className="item space-y-3 flex flex-col justify-center items-center bg-neutral-800 hover:bg-neutral-700 sm:p-4 p-10 rounded-sm shadow-md hover:shadow-xl shadow-black transition-[background-color,transform,box-shadow] duration-300 ease-in-out hover:scale-[1.01]">
            <div className="imagebox w-[75%] md:w-full aspect-[4/3] overflow-hidden rounded-md">
              <img src="/catRegister.gif" className="w-full h-full object-cover" alt="Cat typing on keyboard" loading="lazy" />
            </div>
            <p className="font-bold text-center">Create Your Purr-sona</p>
            <p className="text-center text-sm text-gray-300">Register your cat (or human slave) account. No fake whiskers allowed! Comes with a free digital bowl of milk.</p>
          </div>

          {/* Feature 2: Cat Gallery */}
          <div className="item space-y-3 flex flex-col justify-center items-center bg-neutral-800 hover:bg-neutral-700 sm:p-4 p-10 rounded-sm shadow-md hover:shadow-xl shadow-black transition-[background-color,transform,box-shadow] duration-300 ease-in-out hover:scale-[1.01]">
            <div className="imagebox w-[75%] md:w-full aspect-[4/3] overflow-hidden rounded-md">
              <img src="/kitteneat.gif" className="w-full h-full object-cover" alt="Cats in photo booth" loading="lazy" />
            </div>
            <p className="font-bold text-center">Claw-some Cat Gallery</p>
            <p className="text-center text-sm text-gray-300">Show off your feline in our gallery. 9/10 cats agree it&apos;s better than knocking things off tables.</p>
          </div>

          {/* Feature 3: Donations */}
          <div className="item space-y-3 flex flex-col justify-center items-center bg-neutral-800 hover:bg-neutral-700 sm:p-4 p-10 rounded-sm shadow-md hover:shadow-xl shadow-black transition-[background-color,transform,box-shadow] duration-300 ease-in-out hover:scale-[1.01]">
            <div className="imagebox w-[75%] md:w-full aspect-[4/3] overflow-hidden rounded-md">
              <img src="/cathugrl.gif" className="w-full h-full object-cover" alt="Cat with donation box" loading="lazy" />
            </div>
            <p className="font-bold text-center">Paw It Forward</p>
            <p className="text-center text-sm text-gray-300">Donate to support cats in need. 100% goes to treats, toys, and tiny sweaters (okay, maybe some vet bills too).</p>
          </div>
        </div>
      </div>
    </>


  );
}
