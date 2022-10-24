import React, { useEffect } from 'react'
import config from '../config'
import { useSelector, useDispatch } from 'react-redux'
import { setPassword } from '../slices/passSlice'
import PasswordModal from './PasswordModal'
import { saveAs } from 'file-saver';

import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import DecryptFile, {getMetaData} from './DecryptFile'
import { hashSha256, padKey } from '../utils/hex'
export default () => {
    const [showmodal, setShowmodal] = useState(true)
    let [searchParams, setSearchParams] = useSearchParams();
    let [fileMessage, setFileMessage] = useState();

    useEffect(()=> {
       getMetaData(searchParams.get('id')).then(
        (params)=> {
            if(!params?.iv) {
                setFileMessage("File not found")
                setShowmodal(false)
            }
        }
       )
    }, [searchParams])

    const onPasswordInput= async (p) => {
        setShowmodal(false)
        // download file
        try {
            const decryptedFile = await DecryptFile(searchParams.get('id'),p)
            saveAs(new Blob([decryptedFile.file]), decryptedFile.filename)

            setFileMessage('Your file is served')
        } catch(e) {
            setFileMessage('Something wrong with your file. Forgot your password? Sorry, no way to recover it')
        }
    }

    return (
        <>
            <div className="h-screen bg-gradient-to-bl from-orange-300 to-red-300 w-full py-16 px-4">
                <div className="h-full flex flex-col items-center justify-center place-content-center">
                    <div className="flex items-center flex-col place-content-center border-dashed border-cyan-700 border-0 rounded-full lg:w-1/3  md:w-1/3 w-1/3 h-1/2 p-10 mt-16">
                    { showmodal && 
                        <PasswordModal title="Input Password" click={onPasswordInput}></PasswordModal>
                    }
                    <p className='text-4xl font-bold text-slate-100' >{fileMessage}</p>
                    </div>
                </div>
            </div>
        </>
    )
}