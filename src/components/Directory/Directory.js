import {useState} from "react";
import AddFile from "../AddFile/AddFile";
import AddDirectory from "../AddDirectory/AddDirectory";

const Directory = ({ directory, deleteDirectory, depth = 0, addNewFile, addNewDirectory, deleteFile }) => {
    const [showFiles, setShowFiles] = useState(false);
    const [isShowAddFile, setIsShowAddFile] = useState(false);
    const [isShowAddDirectory, setIsShowAddDirectory] = useState(false);

    const addFile = (newFile) => {
        addNewFile(newFile, directory.id);
        setIsShowAddFile(false);
        setShowFiles(true)
    }

    const deleteDirectoryFile = (fileId) => {
        deleteFile(fileId, directory.id)
        setShowFiles(true)
    }

    const addDirectory = (newDirectory) => {
        addNewDirectory({
            ...newDirectory,
            parentId: directory.id
        },directory.id)
        setIsShowAddDirectory(false);
    }

    return (
        <div style={{ marginLeft: depth * 40 + 'px'}}>
            <h5 onClick={() => setShowFiles(!showFiles)}>{directory.name}</h5>
            <span onClick={() => deleteDirectory(directory)}> delete - </span>
            <span onClick={() => setIsShowAddFile(true)}> - add file - </span>
            <span onClick={() => setIsShowAddDirectory(true)}> - add directory - </span>
            {isShowAddFile && (<AddFile addFile={addFile} />)}
            {isShowAddDirectory && <AddDirectory addDirectory={addDirectory} />}
            {showFiles && (<div>
                <div>
                    filse:
                    {directory.files?.map(file => (
                        <div key={file.id}>
                            {file.name}
                            <span onClick={() => deleteDirectoryFile(file.id)}> - delete this file </span>
                        </div>
                    ))}
                </div>
                {directory.childs?.map((newDirectory,i) => (
                    <Directory
                        directory={newDirectory}
                        key={newDirectory.name + i}
                        depth={depth + 1}
                        deleteDirectory={deleteDirectory}
                        addNewFile={addNewFile}
                        addNewDirectory={addNewDirectory}
                        deleteFile={deleteFile}
                    />
                ))}
            </div>)}
        </div>
    )
}

export default Directory;