import {useState} from "react";
import {v4 as uuid} from "uuid";

const AddDirectory = ({addDirectory}) => {
    const [directoryName, setDirectoryName] = useState('');

    const submit = (e) => {
        e.preventDefault();
        addDirectory({
            name: directoryName,
            childs: [],
            files: [],
            id: uuid()
        })
    }

    return (
        <div>
            <input type='text' placeholder='directory name...' onChange={(e) => setDirectoryName(e.target.value)}/>
            <button onClick={submit}> add this directory </button>
        </div>
    )
}

export default AddDirectory;