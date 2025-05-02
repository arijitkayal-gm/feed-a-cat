import React from 'react'

const Gallery =({gallery}) => {
    
    return (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 p-4 w-full">
            {gallery?.map((pic, index) => (
                <img loading="lazy" src={pic} alt={`cat ${index}`} key={index} className="mb-4 break-inside-avoid w-full rounded-lg hover:shadow-lg hover:shadow-black shadow-md shadow-black" />
            ))}
        </div>
    )
}

export default Gallery