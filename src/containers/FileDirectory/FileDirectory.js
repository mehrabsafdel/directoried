import {useState} from "react";
import Directory from "../../components/Directory/Directory";
import AddFile from "../../components/AddFile/AddFile";
import AddDirectory from "../../components/AddDirectory/AddDirectory";

const FileDirectory = () => {
    const [rootDirectory, setRootDirectory] = useState({
        directories: [],
        files: []
    })
    const [isShowAddDirectory, setIsShowAddDirectory] = useState(false);
    const [isShowAddFile, setIsShowAddFile] = useState(false);

    const addNewDirectory = (newDirectory, parentID) => {
        if (parentID) setRootDirectory({
            directories: executeNewDirectory(newDirectory, parentID),
            files: rootDirectory.files
        })
        else {
            setRootDirectory({
                directories: [...rootDirectory.directories, newDirectory],
                files: rootDirectory.files
            })
            setIsShowAddDirectory(false)
        }
    }

    const executeNewDirectory = (newDirectory, parentID, shadowRootDirectory = rootDirectory.directories) => {
        return shadowRootDirectory.map( directory => {
            if (directory.id === parentID) {
                return {
                    ...directory,
                    childs: [...directory.childs, newDirectory]
                }
            }
            else if (directory.childs.length) {
                return {
                    ...directory,
                    childs: executeNewDirectory(newDirectory, parentID, directory.childs)
                }
            }
            else return directory
        })
    }

    const deleteDirectory = (deletingDirectory) => {
        setRootDirectory({
            ...rootDirectory,
            directories: executeDeleteDirectory(deletingDirectory)
        })
    }

    const executeDeleteDirectory = (deletingDirectory, shadowRootDirectory = rootDirectory.directories) => {
        return shadowRootDirectory.reduce((result, directory) => {
            if (directory.id === deletingDirectory.id) {
                return result
            } else if (directory.childs.length) {
                result.push({
                    ...directory,
                    childs: [...executeDeleteDirectory(deletingDirectory, directory.childs)]
                })
                return result;
            } else {
                result.push(directory)
                return result;
            }
        }, [])
    }

    const addNewFile = (newFile, directoryId) => {
        if (directoryId) setRootDirectory({
            files: rootDirectory.files,
            directories: executeAddNewFile(newFile, directoryId)
        });
        else {
            setRootDirectory({
                directories: rootDirectory.directories,
                files: [...rootDirectory.files, newFile]
            })
            setIsShowAddFile(false)
        }
    }

    const executeAddNewFile = (newFile, directoryId, shadowRootDirectory = rootDirectory.directories) => {
        return shadowRootDirectory.map(directory => {
            if (directory.id === directoryId) {
                return {
                    ...directory,
                    files: [...directory.files, newFile]
                }
            } else if (directory.childs.length) {
                return {
                    ...directory,
                    childs: executeAddNewFile(newFile, directoryId, directory.childs)
                }
            } else return directory
        });
    }

    const deleteFile = (fileId, directoryId) => {
        if (directoryId) {
            setRootDirectory({
                ...rootDirectory,
                directories: executeDeleteFile(fileId, directoryId)
            })
        }
        else setRootDirectory({
            ...rootDirectory,
            files: rootDirectory.files.filter( file => file.id !== fileId)
        })
    }

    const executeDeleteFile = (fileId, directoryId, shadowRootDirectory = rootDirectory.directories) => {
        return shadowRootDirectory.map( directory => {
            if (directory.id === directoryId) {
                return {
                    ...directory,
                    files: directory.files.filter(file => file.id !== fileId)
                }
            } else if (directory.childs.length) {
                return {
                    ...directory,
                    childs: executeDeleteFile(fileId, directoryId, directory.childs)
                }
            } else return directory
        })
    }

    return (
        <div>
            <div>
                <h3 onClick={() => setIsShowAddFile(!isShowAddFile)}> add file to root</h3>
                {isShowAddFile && <AddFile addFile={addNewFile} />}
            </div>
            <div>
                <h3 onClick={() => setIsShowAddDirectory(!isShowAddDirectory)}> add directory to root</h3>
                {isShowAddDirectory && <AddDirectory addDirectory={addNewDirectory} />}
            </div>
            {rootDirectory.directories.map( (directory,i) => (
                <Directory
                    directory={directory}
                    key={directory.name + i}
                    deleteDirectory={deleteDirectory}
                    addNewFile={addNewFile}
                    addNewDirectory={addNewDirectory}
                    deleteFile={deleteFile}
                />
            ))}
            root files:
            {rootDirectory.files.map( file => (
                <div key={file.id}>
                    {file.name}
                    <span onClick={() => deleteFile(file.id)}> - delete this file </span>
                </div>
            ))}
        </div>
    )
}


export default FileDirectory;