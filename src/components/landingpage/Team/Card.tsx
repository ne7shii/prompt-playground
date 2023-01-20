import React from 'react'
import type { Member } from '../../../config/team'
import { AiFillFacebook, AiFillLinkedin } from 'react-icons/ai';
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
    data: Member
}

const Card = (props: Props) => {
    return (
        <div className="p-4 lg:w-1/4 md:w-1/2">
            <div className="h-full flex flex-col items-center text-center">
                <Image alt={props.data.fullname} width={300}  height={300} className="flex-shrink-0 rounded-full w-56 h-56 object-cover object-center mb-4" src={props.data.imageUrl} />
                <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-gray-900">{props.data.fullname}</h2>
                    <h3 className="text-gray-500 mb-3">{props.data.role}</h3>
                    <p className="mb-4">{props.data.description}</p>
                    <span className="inline-flex">
                        {props.data.contact.linkinUrl && <a className="text-gray-500" href={props.data.contact.linkinUrl} target={"_blank"} rel="noreferrer">
                            <AiFillLinkedin size={25} />
                        </a>}
                        {props.data.contact.facebookUrl && <a className="text-gray-500" href={props.data.contact.facebookUrl} target={"_blank"} rel="noreferrer">
                            <AiFillFacebook size={25} />
                        </a>}
                        {props.data.contact.websiteUrl && <a className="text-gray-500" href={props.data.contact.websiteUrl} target={"_blank"} rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                        </a>
                        }

                    </span>
                </div>
            </div>
        </div>
    )
}

export default Card