"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchUser, updateUser } from '@/actions/useractions'
import { Button } from './Button'
import { toast } from 'sonner'

const Dashboard = () => {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [form, setform] = useState({
        gallery: ['']
    })

    useEffect(() => {
        console.log(session)

        if (!session) {
            router.push('/login')
        }
        else {
            getData()
        }
    }, [])


    const getData = async () => {
        let u = await fetchUser(session.user.name)
        setform(u)
    }

    const validateForm = () => {
        if (!form.username || form.username.trim() === '') {
            toast.error("Username cannot be empty");
            return false;
        }
        // Add other validations as needed
        // Check if email is empty
        if (!form.email || form.email.trim() === '') {
            toast.error("Email cannot be empty");
            return false;
        }
        // Check if name is empty
        if (!form.name || form.name.trim() === '') {
            toast.error("Name cannot be empty");
            return false;
        }
        return true;
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        try {
            const dataToSubmit = {
                ...form,
                gallery: form.gallery.filter(url => url.trim() !== '')
            }
            const result = await updateUser(dataToSubmit, session.user.name);

            if (!result) {
                throw new Error("No response from server");
            }

            if (result.success) {
                toast.success(result.message || "Profile updated successfully");
                await update();// Refresh session if needed
            } else {
                toast.error(result.error || "Failed to update profile");
            }

        } catch (error) {
            console.error("Submission error:", error);
            toast.error(error.message || "An unexpected error occurred");
        }

    }

    const handleSpace = (e) => {
        if (e.key === ' ') {
            e.preventDefault();
        }
    }

    const handleGalleryChange = (index, value) => {
        const newGallery = [...form.gallery]
        newGallery[index] = value
        setform({ ...form, gallery: newGallery })
        console.log(newGallery,form)
    }

    const addGalleryField = () => {
        setform({ ...form, gallery: [...form.gallery, ''] })
    }

    const removeGalleryField = (index) => {
        if (form.gallery.length > 1) {
            const newGallery = form.gallery.filter((_, i) => i !== index)
            setform({ ...form, gallery: newGallery })
        }
    }



    return (
        <>
            <div className='container mx-auto py-5 px-6'>
                <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your Dashboard</h1>

                <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>

                    <div className='my-2'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input for email */}
                    <div className="my-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input forusername */}
                    <div className='my-2'>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input value={form.username ? form.username : ""} onChange={handleChange} onKeyDown={handleSpace} type="text" name='username' id="username" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input for profile picture of input type text */}
                    <div className="my-2">
                        <label htmlFor="profilePic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
                        <input value={form.profilePic ? form.profilePic : ""} onChange={handleChange} type="text" name='profilePic' id="profilePic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* input for cover pic  */}
                    <div className="my-2">
                        <label htmlFor="coverPic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
                        <input value={form.coverPic ? form.coverPic : ""} onChange={handleChange} type="text" name='coverPic' id="coverPic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* Gallery Pictures (Multiple URLs) */}
                    <div className="my-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gallery</label>
                        {form.gallery?.map((url, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    value={url}
                                    onChange={(e) => handleGalleryChange(index, e.target.value)}
                                    type="text"
                                    placeholder="https://example.com/image.jpg"
                                    className="flex-1 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                {form.gallery.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeGalleryField(index)}
                                        className="px-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addGalleryField}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            + Add Another Image
                        </button>
                    </div>

                    {/* input for bio  */}
                    <div className="my-2">
                        <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
                        <textarea value={form.bio ? form.bio : ""} onChange={handleChange} type="text" name='bio' id="bio" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* Submit Button  */}
                    <div className="my-6">
                        <button type="submit" className={`block w-full ${Button}`}>Save</button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default Dashboard