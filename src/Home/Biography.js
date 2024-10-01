import React from 'react'

export default function Biography(props) {
    return (
        <div className=' grid lg:grid-cols-2 grid-cols-1 gap-10 md:pt-0 pt-10 mb-10 lg:mb-0'>
            <div>
                <img src={props.aboutImage} alt='about' />
            </div>
            <div className='md:px-10 md:pt-6 pt-6 px-6'>
                <p className=' text-slate-500 py-2'>Biography</p>
                <p className='font-serif font-bold text-lg py-2'>Who We Are</p>
                <p className='font-sans text-xs '>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit necessitatibus voluptates magnam ducimus laboriosan perspiciatis Repudiandae eius adipisci similique, error corporis quisquam vitae fugit placeat exercitationem, dicta, minima laboriosam corrupti. Voluptas similique vel, illo, inventore provident facere nihil quibusdam deleniti vitae aliquam corrupti a consequuntur corporis alias minus officiis debitis!
                    <br /><br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    <br /><br />
                    Lorem ipsum dolor sit amet.
                    <br /><br />
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, rem? Uliam maiores, minus fuga explicabo odio cupiditate assumenda iure corrupti suscipit ipsum? Eaque, a quos molestiae fugiat voluptates rerum explicabo ipsa, vel sed atque quisquam.
                    <br /><br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et sapiente cupiditate eaque.
                    <br /><br />
                    Lorem, ipsum dolor.</p>

            </div>
        </div>
    )
}
