import React, { useEffect, useState } from 'react'
import makeQuery from '../utils/AxiosQuery'
import { GET_ALL_BOOKS } from '../utils/Queries'

const AllPdfCard = () => {

    const [allPdfs, setAllPdfs]: any = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const getAllBooks = async () => {
        const data: any = await makeQuery(GET_ALL_BOOKS, null, "Query")
        console.log("🚀 ~ getAllBooks ~ data:", data)
        setAllPdfs(data.getAllBooks)
        setIsDataFetched(true);
    }

    useEffect(() => {
        if (!isDataFetched) {
            getAllBooks()
        }
    }, [isDataFetched, allPdfs])

    return (
        <div>
            <div className='flex flex-row justify-center bg-slate-900 min-h-screen h-auto'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row'>
                    {allPdfs.length &&
                        allPdfs.map((pdf: any) => {
                            console.log("🚀 ~ allPdfs.map ~ pdf:", pdf);

                            return pdf.previewImageLink
                            ? (
                                        <div className='m-4 h-[50vh] w-[80vw] sm:w-[40vw] md:w-[30vw] lg:w-[22vw] border-emerald-500 border-2 rounded-xl cursor-pointer'>
                                            <div className="border-2 h-3/4 rounded-xl bg-cover bg-center" style={{backgroundImage: `url('${pdf.previewImageLink}')`}}></div>
                                            <div className="flex justify-center items-center text-center text-emerald-500 text-lg font-semibold h-1/4 rounded">{pdf.name}</div>
                                        </div>
                            )
                            : (
                                        <div className='m-4 h-[50vh] w-[80vw] sm:w-[40vw] md:w-[30vw] lg:w-[22vw] border-emerald-500 border-2  rounded-xl cursor-pointer'>
                                            <div className="flex justify-center font-mono text-4xl text-white font-bold items-center bg-red-500 border-2 h-3/4 rounded-xl">
                                                PDF
                                            </div>
                                            <div className="flex justify-center items-center text-center text-emerald-500 text-lg font-semibold h-1/4 rounded">{pdf.name}</div>
                                        </div>

                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default AllPdfCard