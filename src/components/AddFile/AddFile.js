import {useState} from "react";
import { v4 as uuid } from 'uuid';

const AddFile = ({addFile}) => {
    const [fileName, setFileName] = useState('');

    const submit = (e) => {
        e.preventDefault();
        addFile({
            name: fileName,
            id: uuid()
        })
    }

    return (
        <div>
            <input type='text' placeholder='file name...' onChange={(e) => setFileName(e.target.value)}/>
            <button onClick={submit}> add this file </button>
        </div>
    )
}

export default AddFile;