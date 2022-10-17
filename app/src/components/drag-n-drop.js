import React from 'react'
import axios from 'axios'
import config from '../config'

const Snack = ({ show, onAnimationEnd }) => {
    return (
        <div
            className={`my-snack ${show ? 'show' : 'hidden'}`}
            onAnimationEnd={(e) => {
                if (e.animationName === 'fadeout') {
                    onAnimationEnd(e)
                }
            }}>
            Link copied
        </div>
    )
}


export default function DragDropFile() {
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    const [showSnack, setShowSnack] = React.useState(false);
    const [link, setLink] = React.useState("http://localhost:3001/downloads/askjgkjhgkjgkjgkjhgkjgkjhgkjhgjgkjhggkhgkjgdf1234");
    // ref
    const inputRef = React.useRef(null);
    const linkCopiedRef = React.useRef(null);
    let response = ''
    const handleFiles = async (file) => {
        try {
            const formData = new FormData();
            //formData.append("selectedFile", file);
            Array.from(file).forEach(f => {
                formData.append('files', f);
            });
            response = await axios({
                method: "post",
                url: config.BACKEND_URL,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });

        } catch (error) {
            console.log(error)
        }
        if (!response.data?.error)
            setLink(config.BACKEND_URL + "/downloads/" + response.data?.id)
    }
    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
            console.log(e.dataTransfer.files)
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    const onCloseClick = () => {
        setLink('')
        setShowSnack(false)
    }

    const copyToClipboard = () => { navigator.clipboard.writeText(link); showSnackToggle() }

    const showSnackToggle = () => {
        setShowSnack(true);
    }
    const getShortLink = (l) => {
        return l.length > 37 ? (l.substring(0, 25) + '...' + l.slice(-10)) : l
    }
    return (<>
        {link &&

            <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div class="fixed box-border inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div class="fixed inset-0 z-10 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">

                        <div class="relative transform overflow-hidden rounded-lg bg-gradient-to-tl from-yellow-400 to-orange-400 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div class="bg-gradient-to-tl from-yellow-400 to-orange-400 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div class="sm:flex sm:items-start">
                                    <div class="mx-auto flex h-8 sm:w-1/6 m-3 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 ">

                                        <a href="#" onClick={onCloseClick}>
                                            <svg className="h-12 w-12 m-3 svg-icon" viewBox="0 0 20 20">
                                                <path fill="#ffffff" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                                            </svg>
                                        </a>

                                    </div>
                                    <div class="mt-3 text-center mb-3 sm:mt-0 sm:ml-4 sm:w-5/6 sm:text-left">
                                        <h3 class="text-lg font-medium leading-6 text-slate-100 p-3" id="modal-title">Your one-time link to the file is served</h3>
                                        <div class="mt-2">
                                            <p class="text-sm text-gray-500">
                                                {/* <span className="text-4xl font-bold  text-red-100">
                        </span> */}
                                                <p className="">
                                                    {/* <svg className="svg-icon w-7 h-7 fill-slate-300 active:bg-red-500 absolute mr-8 -m-2 transform right-1" onClick={copyToClipboard} viewBox="0 0 20 20">
                                 <path  d="M18.378,1.062H3.855c-0.309,0-0.559,0.25-0.559,0.559c0,0.309,0.25,0.559,0.559,0.559h13.964v13.964
			 					c0,0.309,0.25,0.559,0.559,0.559c0.31,0,0.56-0.25,0.56-0.559V1.621C18.938,1.312,18.688,1.062,18.378,1.062z M16.144,3.296H1.621
			 					c-0.309,0-0.559,0.25-0.559,0.559v14.523c0,0.31,0.25,0.56,0.559,0.56h14.523c0.309,0,0.559-0.25,0.559-0.56V3.855
			 					C16.702,3.546,16.452,3.296,16.144,3.296z M15.586,17.262c0,0.31-0.25,0.558-0.56,0.558H2.738c-0.309,0-0.559-0.248-0.559-0.558
			 					V4.972c0-0.309,0.25-0.559,0.559-0.559h12.289c0.31,0,0.56,0.25,0.56,0.559V17.262z"></path>
                             </svg> */}
                                                    <Snack
                                                        show={showSnack}
                                                        onAnimationEnd={(e) => {
                                                            setShowSnack(false)
                                                        }}
                                                    />

                                                    <p onClick={copyToClipboard} className=" p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-mono  m-3 overflow-hidden" readonly autocorrect="off" spellcheck="off">
                                                        {link}
                                                    </p>
                                                </p>

                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        }

        <div class="h-screen bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
            <div class="h-full flex flex-col items-center justify-center place-content-center">


                <div class="flex items-center flex-col place-content-center border-dashed border-cyan-700 border-0 rounded-full lg:w-1/3  md:w-1/3 w-1/3 h-1/2 p-10 mt-16"
                >
                    <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                        <input className="hidden" ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
                        <div className="items-center justify-self-center flex flex-col gap-3">
                            {/* <i class=" text-6xl fas fa-cloud-upload-alt"></i> */}

                            <header className="text-orange-100 focus:outline-none text-4xl font-extrabold  ">Drag & Drop to Upload File</header>
                            <span className="text-orange-200">OR</span>
                            <button className="upload-button px-10 py-1 text-lg font-bold cursor-pointer rounded-md bg-amber-300 text-slate-700" onClick={onButtonClick}>Click to upload</button>
                            <img src="../images/hole.png"></img>
                        </div>

                        {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
                    </form>
                </div>
            </div>
        </div>
    </>
    );
};
