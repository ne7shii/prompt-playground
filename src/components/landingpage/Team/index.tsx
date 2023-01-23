/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
import React, { useRef } from 'react'
import Card from './Card'
import { members } from '../../../config/team'
import { motion, useInView } from 'framer-motion'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const index = (props: Props) => {
    const ref = useRef(null)
    const isInView = useInView(ref)
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="text-4xl font-bold title-font mb-4  text-gray-900">Team</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base sm:text-center">Our team is dedicated to creating a user-friendly website that utilizes the power of GPT-3 through a prompt playground and various OpenAI app examples. We strive to make cutting-edge AI technology accessible to all users, and are constantly working to improve and expand our offerings.</p>
                </div>
                <motion.div ref={ref} className="flex flex-wrap -m-4 justify-center">
                    {
                        members.map((member,i) => (
                            <motion.div
                                animate={{
                                    scale: isInView ? 1 : 0, x: isInView ? 0 : 200
                                }}
                                transition={{delay:0.1*(i)}}
                                className="p-4 lg:w-1/4 md:w-1/2" >
                                <Card key={member.fullname} data={member} />
                            </motion.div>
                        ))
                    }


                </motion.div>
            </div>
        </section>
    )
}

export default index