"use client"
import React from 'react'
import { fetchAllUsers } from '@/actions/useractions'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Showusers = () => {
    useEffect(() => {
            document.title = "Purr-sonalities | All Users"
            getAllUsers()
        }, []);
        const [allUsers, setAllUsers] = useState([]);
    
        const getAllUsers = async () => {
            const users = await fetchAllUsers()
            setAllUsers(users)
            console.log(users)
        }
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-6">User Directory</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allUsers.length > 0 ? (
                    allUsers.map((user) => (
                        <Link
                            href={`/${user.username}`}
                            key={user._id}
                            className="block"
                        >
                            <div
                                key={user._id}
                                className="bg-neutral-800 rounded-lg shadow-black shadow-md overflow-hidden  transition-[background-color,transform,box-shadow]  duration-300 ease-in-out hover:shadow-lg hover:bg-neutral-700 hover:scale-[1.02]"
                            >
                                <div className="p-4">
                                    <div className="flex justify-center mb-4">
                                        <img
                                            src={user.profilePic || "/defaultprofilepic.jpg"}
                                            alt="User Profile"
                                            className="w-32 h-32 object-cover rounded-md border-2 border-blue-100"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h2 className="text-xl font-semibold ">{user.username}</h2>
                                        <p className="text-gray-300 mt-1">{user.bio || 'No bio provided'}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10">
                        <p className="text-gray-500 text-lg">The room is fur-midably empty</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Showusers
