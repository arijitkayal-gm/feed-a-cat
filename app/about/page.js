import React from 'react'
import Link from 'next/link';
import { Button } from "@/components/Button";

const About = () => {
    return (
        <div className="container mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold text-center mb-6">🐾 About Feed a Cat</h1>
            <p className="text-center text-gray-300 text-lg max-w-3xl mx-auto">
                Welcome to <span className="font-semibold">Feed a Cat</span>, the purr-fect place where kindness meets whiskers. We've built a heartfelt platform where anyone can create a profile for a cat in need, share their story, and let others contribute with love (and money!)—one paw at a time.
            </p>

            <div className="mt-10 space-y-8">

                {/* Mission */}
                <div className="bg-neutral-800 hover:bg-neutral-700 p-6 sm:p-8 rounded-sm shadow-md shadow-black hover:shadow-lg">
                    <h2 className="text-2xl font-bold text-center sm:text-left">😻 Our Mission</h2>
                    <p className="text-gray-300 mt-2">
                        We believe that <span className="font-semibold">every cat deserves to be seen, supported, and spoiled</span>. Whether it's a rescue in need, a stray with a story, or a shelter superstar, we make it easy to give them the spotlight—and the support—they deserve.
                    </p>
                    <ul className="mt-3 space-y-2 list-disc list-inside text-gray-300">
                        <li>✔ <span className="font-medium">Create cat profiles</span> with names, bios, and heart-melting photos.</li>
                        <li>✔ <span className="font-medium">Receive donations</span> with heartwarming messages from fellow cat lovers.</li>
                        <li>✔ <span className="font-medium">Show appreciation</span> by showcasing contributors and building a community of kindness.</li>
                    </ul>
                </div>

                {/* How It Works */}
                <div className="bg-neutral-800 hover:bg-neutral-700 p-6 sm:p-8 rounded-sm shadow-md shadow-black hover:shadow-lg">
                    <h2 className="text-2xl font-bold text-center sm:text-left">✨ How It Works</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                        <div className="text-center">
                            <span className="text-3xl">1️⃣</span>
                            <p className="text-gray-300 mt-2 font-medium">Create a Cat Profile</p>
                            <p className="text-sm text-gray-400">Upload a profile pic, cover photo, and gallery. Let the floof shine!</p>
                        </div>
                        <div className="text-center">
                            <span className="text-3xl">2️⃣</span>
                            <p className="text-gray-300 mt-2 font-medium">Share & Receive Donations</p>
                            <p className="text-sm text-gray-400">Others can visit the profile and leave a donation along with a meow-gical message.</p>
                        </div>
                        <div className="text-center">
                            <span className="text-3xl">3️⃣</span>
                            <p className="text-gray-300 mt-2 font-medium">Celebrate Contributors</p>
                            <p className="text-sm text-gray-400">Donors are displayed on the cat's page—because kindness should never be a secret.</p>
                        </div>
                    </div>
                </div>

                {/* Why Feed a Cat */}
                <div className="bg-neutral-800 hover:bg-neutral-700 p-6 sm:p-8 rounded-sm shadow-md shadow-black hover:shadow-lg">
                    <h2 className="text-2xl font-bold text-center sm:text-left">💜 Why Feed a Cat?</h2>
                    <ul className="mt-3 space-y-2 text-gray-300">
                        <li>✔ <span className="font-medium">Real Help, Real Cats</span>: Every donation helps a real cat in need.</li>
                        <li>✔ <span className="font-medium">Whisker-Approved Design</span>: Easy to use, heartwarming to scroll through.</li>
                        <li>✔ <span className="font-medium">Paw-sitive Community</span>: Support and celebrate every meow-ment of care and compassion.</li>
                    </ul>
                </div>

                {/* Human Slaves (Users) Section */}
                <div className="bg-neutral-800 hover:bg-neutral-700 p-6 sm:p-8 rounded-sm shadow-md shadow-black hover:shadow-lg">
                    <h2 className="text-2xl font-bold text-center sm:text-left">🙋‍♂️ For the Human Slaves</h2>
                    <p className="text-gray-300 mt-2">
                        Whether you're a devoted cat butler, snack supplier, or full-time ear-scratcher, this platform is built with <span className="italic">you</span> in mind. Every user gets the power to:
                    </p>
                    <ul className="mt-3 space-y-2 list-disc list-inside text-gray-300">
                        <li>✔ Create a profile for a cat in need—because they obviously can't type (yet).</li>
                        <li>✔ Upload adorable photos to show off their whiskered majesty.</li>
                        <li>✔ Accept donations and display sweet messages from fellow cat worshippers.</li>
                        <li>✔ Connect with a growing tribe of feline fanatics making real impact.</li>
                    </ul>
                </div>

                {/* Cat Pun Glossary */}
                <div className="bg-neutral-800 hover:bg-neutral-700 p-6 sm:p-8 rounded-sm shadow-md shadow-black hover:shadow-lg">
                    <h2 className="text-2xl font-bold text-center sm:text-left">📚 Cat Pun Glossary (For the Uninitiated)</h2>
                    <p className="text-gray-300 mt-2">
                        Not fluent in Cat-speak? Here's what those weirdly adorable phrases mean:
                    </p>
                    <ul className="mt-3 space-y-2 list-disc list-inside text-gray-300">
                        <li><span className="font-semibold">Purr-sona</span> - A cat's profile/personality—because they each have a vibe.</li>
                        <li><span className="font-semibold">Floof</span> - A fluffy, usually chonky cat.</li>
                        <li><span className="font-semibold">Meow-gical</span> - Magical, but better because it involves meows.</li>
                        <li><span className="font-semibold">Whisker-approved</span> - Something a cat would definitely nod at (or ignore gracefully).</li>
                        <li><span className="font-semibold">Human Slaves</span> - A playful term for cat owners, because let's be honest… who's really in charge?</li>
                        <li><span className="font-semibold">Paw-sitive</span> - Positive, with a touch of paw-someness.</li>
                        <li><span className="font-semibold">Meow-ment</span> - A meaningful or adorable moment shared with a cat.</li>
                        <li><span className="font-semibold">Catributors</span> - Donors or supporters who contribute to a cat's wellbeing.</li>
                        <li><span className="font-semibold">Cat-alogue</span> - A fancy way of saying cat gallery or profile list.</li>
                        <li><span className="font-semibold">Fur-ther Read</span> - Additional info or articles for those who want to dig their claws in deeper.</li>
                        <li><span className="font-semibold">Feed the Purrpose</span> - Support the mission, feed a cat, and spread the love—it's more than a pun, it's a calling.</li>
                    </ul>
                </div>

            </div>

            <div className="mt-10 text-center">
                <p className="text-lg text-gray-300 mb-4">
                    Start your journey today—create a cat profile, share their story, and help make a difference (plus, who doesn't love more cat pics?). 🐾
                </p>
                <Link href={"/login"}>
                    <button className={Button}>
                        Help a Cat Today 🐱❤️
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default About

export const metadata = {
    title: "About Us - Feed a Cat",
    description: "Learn about Feed a Cat, our mission, and how you can help cats in need. Join us in making a difference, one paw at a time!",
  }