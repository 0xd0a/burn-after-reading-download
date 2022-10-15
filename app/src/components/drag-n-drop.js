import React from 'react'
import axios from 'axios'

export default  function DragDropFile() {
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);
    const handleFiles = async (file) => {
        try {
            const formData = new FormData();
            //formData.append("selectedFile", file);
            Array.from(file).forEach(f => {
                formData.append('files', f);
            });

            const response = await axios({
                method: "post",
                url: process.env.API_URL || "http://localhost:3001/upload",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            console.log(error)
        }
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

    return (
        <div class="h-full bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
            <div class="flex flex-col items-center justify-center">
            
                <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">
                Upload a file
                </p>
            
                <div class="w-full h-full border-dashed p-3 border-cyan-700 border-2 bg-white shadow rounded lg:w-1/2  md:w-1/2 w-full p-10 mt-16">
                 <form className="" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                    <input className="hidden" ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
                    <div>
                        <p className="">Drag and drop your file here</p>
                        <button className="upload-button hidden" onClick={onButtonClick}>Upload a file</button>
                    </div>
                {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
                </form>
            </div>
            </div>
        </div>
    );
};
