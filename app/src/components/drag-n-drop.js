import React from 'react'
import axios from 'axios'
import config from '../config'

const Snack = (props) => {
    //show, classes, onAnimationEnd
    return (
        <div
            className={`${props.classes} ${props.show ? 'show' : 'hidden'}`}
            onAnimationEnd={(e) => {
                if (e.animationName === 'fadeout') {
                    props.onAnimationEnd(e)
                }
            }}>
            {props.children}
        </div>
    )
}

export default function DragDropFile() {
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    const [showSnack, setShowSnack] = React.useState(false);
    const [link, setLink] = React.useState("");
    const [error, setError] = React.useState("Can't connect");

    // ref
    const inputRef = React.useRef(null);
    const linkCopiedRef = React.useRef(null);
    const errorRef = React.useRef(null);

    let response = ''
    const handleFiles = async (file) => {
        try {
            const formData = new FormData();
            //formData.append("selectedFile", file);
            console.log(config.API_URL)
            Array.from(file).forEach(f => {
                formData.append('files', f);
            });
            response = await axios({
                method: "post",
                url: config.API_URL,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });

        } catch (error) {
            console.log(error)
            setError('Network error')
            return
        }
        if (response.data && !response.data?.error)
            setLink(config.API_URL + "/downloads/" + response.data?.id)
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

    const errorToggle = (e) => {
        setError(e);
        console.log()
        //errorRef.current.removeClass('-mb-12')
        //errorRef.current.addClass('mb-12')
        setTimeout(()=>{
            //errorRef.current.addClass('-mb-12')
            //errorRef.current.removeClass('mb-12')

        },2000)
    }

    const getShortLink = (l) => {
        return l.length > 37 ? (l.substring(0, 25) + '...' + l.slice(-10)) : l
    }
    // Update price
    React.useEffect(() => {
        setInterval(errorToggle(''), 20000);
    }, []);

    
    return (<>
        {/* {error && 
            <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="notification">
            <div className="2xl:w-4/12 bg-gray-50 h-screen overflow-y-auto p-8 absolute right-0">
                <div className="flex items-center justify-between">
                    {error}
                </div>
                </div>
                </div>
                
        } */}
        {error && 
        
            <Snack
                show={error}
                classes="my-snack bg-red-800 text-slate-200 dark:bg-gray-900 shadow-xl h-12 flex items-stretch fixed m-auto inset-0 z-50 transition-all duration-150 ease-in-out mb-12 w-70"
                onAnimationEnd={(e) => {
                    setError(false)
                }}
            >
                <div class="flex items-center p-4">
                <svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="none" d="M13.864,6.136c-0.22-0.219-0.576-0.219-0.795,0L10,9.206l-3.07-3.07c-0.219-0.219-0.575-0.219-0.795,0
								c-0.219,0.22-0.219,0.576,0,0.795L9.205,10l-3.07,3.07c-0.219,0.219-0.219,0.574,0,0.794c0.22,0.22,0.576,0.22,0.795,0L10,10.795
								l3.069,3.069c0.219,0.22,0.575,0.22,0.795,0c0.219-0.22,0.219-0.575,0-0.794L10.794,10l3.07-3.07
								C14.083,6.711,14.083,6.355,13.864,6.136z M10,0.792c-5.086,0-9.208,4.123-9.208,9.208c0,5.085,4.123,9.208,9.208,9.208
								s9.208-4.122,9.208-9.208C19.208,4.915,15.086,0.792,10,0.792z M10,18.058c-4.451,0-8.057-3.607-8.057-8.057
								c0-4.451,3.606-8.057,8.057-8.057c4.449,0,8.058,3.606,8.058,8.057C18.058,14.45,14.449,18.058,10,18.058z"></path>
						</svg>
                <p class="ml-2 dark:text-gray-50">{error}</p></div>
            </Snack>
        }
        {link &&

            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed box-border inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-gradient-to-tl from-yellow-400 to-orange-400 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-gradient-to-tl from-yellow-400 to-orange-400 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-8 sm:w-1/6 m-3 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 ">

                                        <a href="#" onClick={onCloseClick}>
                                            <svg className="h-12 w-12 m-3 svg-icon" viewBox="0 0 20 20">
                                                <path fill="#ffffff" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                                            </svg>
                                        </a>

                                    </div>
                                    <div className="mt-3 text-center mb-3 sm:mt-0 sm:ml-4 sm:w-5/6 sm:text-left">
                                        <h3 className="text-lg font-medium leading-6 text-slate-100 p-3" id="modal-title">Your one-time link to the file is served</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
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
                                                        classes="my-snack"
                                                        onAnimationEnd={(e) => {
                                                            setShowSnack(false)
                                                        }}
                                                    > Link Copied </Snack>

                                                    <p onClick={copyToClipboard} className="break-all p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-mono  m-3 overflow-hidden">
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

        <div className="h-screen bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
            <div className="h-full flex flex-col items-center justify-center place-content-center">


                <div className="flex items-center flex-col place-content-center border-dashed border-cyan-700 border-0 rounded-full lg:w-1/3  md:w-1/3 w-1/3 h-1/2 p-10 mt-16"
                >
                    <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                        <input className="hidden" ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
                        <div className="items-center justify-self-center flex flex-col gap-3">
                            {/* <i className=" text-6xl fas fa-cloud-upload-alt"></i> */}

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
