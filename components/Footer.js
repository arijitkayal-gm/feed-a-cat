import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-black text-white flex flex-col sm:flex-row items-center justify-center px-4 py-4 sm:py-6 text-center">
            <p className="max-w-[90%] sm:max-w-[70%] text-sm sm:text-base">
                © {new Date().getFullYear()} Feed a Cat. All rights reserved. Violators will be pounced on (or ignored, depending on the cat's mood).
            </p>
        </footer>

    )
}

export default Footer