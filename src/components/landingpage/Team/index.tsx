import React from 'react'
import Card from './Card'
import {members} from '../../../config/team'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const index = (props: Props) => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="text-4xl font-medium font-bold title-font mb-4  text-gray-900">Team</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base sm:text-center">Our team is dedicated to creating a user-friendly website that utilizes the power of GPT-3 through a prompt playground and various OpenAI app examples. We strive to make cutting-edge AI technology accessible to all users, and are constantly working to improve and expand our offerings.</p>
                </div>
                <div className="flex flex-wrap -m-4 justify-center">
                    {
                        members.map(member=>(
                            <Card key={member.fullname} data={member}/>
                        ))
                    }
                    
                    
                </div>
            </div>
        </section>
    )
}

export default index