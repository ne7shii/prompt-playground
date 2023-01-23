/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import Layout from '../components/Layout'
import { GetStaticPathsContext, GetStaticProps } from 'next/types'
// import CodeEditor from '../components/CodeEditor'
import dynamic from 'next/dynamic'
import { Controller, useForm } from 'react-hook-form'
import { api } from "../utils/api";

type Props = {}

const voiceorder = (props: Props) => {
    const CodeEditor = dynamic(
        () => import('../components/CodeEditor'),
        { ssr: false }
    )

    const defaultValue = `
    type Coffee={
        type: 'coffee',
        name: 'Espresso'|'Latte'|'Mocha'|'Americano'|'Macchiato'
        sweetness: number //between 0, 100
        quantity: number
        menuType: 'hot'|'cold'|'frappe'
        extrashot: boolean
        topping: Topping[]
        }
                
    type Tea={
        type: 'tea',
        name: 'Green tea'|'Milk tea'|'Jusmine tea'
        sweetness: number //between 0, 100   ,normally sweetness is 75, if americano alway be 0
        quantity: number
        menuType: 'hot'|'cold'|'frappe'
        topping?: Topping[] //normal is []
        }
            
    type Topping='Bubble'|'Whipped Cream'
            
    type Menu=Array<Tea|Coffee>`

    const form = useForm<{ code: string, text: string }>({ defaultValues: { code: defaultValue, text: 'ice americano with extrashot and two frappe justmine tea one with extra sweet and other one with whipped cream' } })
    const res = api.openai.voiceOrder.useMutation()
    return (
        <Layout>
            <>
                <div>
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Voice order</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Order food using voice command
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">

                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-3">
                                            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                Define Menu Type
                                            </label>
                                            <div className="mt-1 flex rounded-md ">
                                                <div className='rounded-lg bg-red500 w-full'>
                                                    <Controller
                                                        name="code"
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <CodeEditor value={field.value} onChange={field.onChange} />
                                                        )} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                            input text
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                id="text-input"
                                                {...form.register("text")}
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder=""
                                                defaultValue={''}
                                            />
                                            {/* <TsEditor className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/> */}
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Brief description for your profile. URLs are hyperlinked.
                                        </p>
                                    </div>




                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                        disabled={res.isLoading}
                                        onClick={() => {
                                            form.handleSubmit((data) => {
                                                res.mutate({ text: data.text, tsCode: data.code })
                                            })()
                                        }}

                                        className="disabled:bg-slate-500 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Submit
                                    </button>
                                </div>
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">


                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                            Result
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                rows={10}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                value={res.data?.res || ''}
                                                disabled
                                            />
                                            {/* <TsEditor className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/> */}
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            response from openai GPT-3 {res.data && `: ${res.data?.model}`}
                                        </p>
                                    </div>




                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div> */}


            </>

        </Layout>

    )
}

export default voiceorder

// export const getStaticProps: GetStaticProps =(context) => {
//     return {
//         props: {},
//     }
// }