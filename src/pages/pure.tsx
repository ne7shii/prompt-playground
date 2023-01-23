/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-misused-promises */


import React, { Fragment, useState } from 'react'
import Layout from '../components/Layout'
import { api } from "../utils/api";
import { Controller, useForm } from 'react-hook-form';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

type Props = {}

type FormValues = {
    prompt: string,
    model: string
}
const pure = (props: Props) => {
    const form = useForm<FormValues>({
        mode: 'all', defaultValues: {
            model: 'text-davinci-003',
            prompt: ''
        }
    })
    const res = api.openai.purePrompt.useMutation()
    const modelsList = api.openai.listModels.useQuery()
    const [query, setQuery] = useState<string>('')
    const filteredModel =
        query === ''
            ? modelsList.data?.res.data || []
            : modelsList.data?.res.data.filter(model => model.id.toLowerCase().includes(query.toLowerCase())) || []
    return (
        <Layout>
            <>
                <div>
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Davinci OpenAI</h3>
                                <div className="mt-1 text-sm text-gray-600">
                                    openai using <i>{form.watch('model')}</i>
                                </div>

                            </div>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">


                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                            Input Prompt
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="enter prompt here"
                                                defaultValue={''}
                                                {...form.register("prompt")}
                                            />
                                            {/* <TsEditor className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/> */}
                                        </div>
                                        {/* <p className="mt-2 text-sm text-gray-500">
                                            enter prompt
                                        </p> */}
                                    </div>
                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                            Model
                                        </label>
                                        <Controller
                                            name="model"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <Combobox value={field.value} onChange={field.onChange}>
                                                        <div className="relative mt-1">
                                                            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                                                <Combobox.Input
                                                                    className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                                                    // displayValue={(model) => model.name}
                                                                    onChange={(event) => setQuery(event.target.value)}
                                                                />
                                                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                                    <ChevronUpDownIcon
                                                                        className="h-5 w-5 text-gray-400"
                                                                        aria-hidden="true"
                                                                    />
                                                                </Combobox.Button>
                                                            </div>
                                                            <Transition
                                                                as={Fragment}
                                                                leave="transition ease-in duration-100"
                                                                leaveFrom="opacity-100"
                                                                leaveTo="opacity-0"
                                                                afterLeave={() => setQuery('')}
                                                            >
                                                                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                    {filteredModel.length === 0 && query !== '' ? (
                                                                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                                            Nothing found.
                                                                        </div>
                                                                    ) : (
                                                                        filteredModel.map((model) => (
                                                                            <Combobox.Option
                                                                                key={model.id}
                                                                                className={({ active }) =>
                                                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                                                    }`
                                                                                }
                                                                                value={model.id}
                                                                            >
                                                                                {({ selected, active }) => (
                                                                                    <>
                                                                                        <span
                                                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                                }`}
                                                                                        >
                                                                                            {model.id}
                                                                                        </span>
                                                                                        {selected ? (
                                                                                            <span
                                                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                                                    }`}
                                                                                            >
                                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                            </span>
                                                                                        ) : null}
                                                                                    </>
                                                                                )}
                                                                            </Combobox.Option>
                                                                        ))
                                                                    )}
                                                                </Combobox.Options>
                                                            </Transition>
                                                        </div>
                                                    </Combobox>
                                                </>

                                            )} />
                                    </div>


                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                        disabled={res.isLoading}
                                        className="disabled:bg-slate-500 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={
                                            () =>
                                                form.handleSubmit(data => {
                                                    res.mutate({ prompt: data.prompt, model: data.model })
                                                })()

                                        }
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
                                                value={res.data?.res}
                                                defaultValue={''}
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

export default pure