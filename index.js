const fs = require("fs")

if(process.argv.length == 2) {
    console.error("Gib the path to your movie directory pls")
    process.exit(1)
}

if(process.argv[2]) {
    path = process.argv[2]
    folder_names = getCurrentFilenames(path) //change to cmd argument
    folder_names.forEach(oldname => {
        if (oldname.includes(")")) {
            newname = getNewName(oldname)
            currPath = path.concat("\\", oldname)
            newPath = path.concat("\\", newname)
            fs.rename(currPath, newPath, function(err) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(`Successfully renamed ${oldname}`)
                }
            })
        }
        else {
            console.log(`${oldname} does not have the expected folder format`)
        }    
    })   
}


function getCurrentFilenames(path) {
    console.log("Fetching current folder names...")
    folder_names = []
    fs.readdirSync(path).forEach(folder => {
        file_names.push(folder)
    })
    return folder_names
}

function getNewName(fileName) {
    //use regex to remove all characters following (YYYY) part of the folder name
    newName = fileName.substring(0, fileName.indexOf(')')).concat(")")
    return newName
}