const fs = require('fs')

let path = ""

module.exports = function() {

    this.CreateDatabase = (dbName) => {
        fs.createWriteStream(`${path}/${dbName}.json`)
        console.log('Database has been created.')
    }

    this.InsertData = (dbName, newData) => {
        fs.readFile(`${path}/${dbName}.json`, 'utf-8', (err, data) => {
            if(err) {
                console.log(err)
            }
            else {
                var jsonArray = JSON.parse(data)
                jsonArray.push(newData)
    
                fs.writeFile(`${path}/${dbName}.json`, JSON.stringify(jsonArray), (err) => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        console.log(`New data has been successfully added to ${dbName}`)
                    }
                })
            }
        })
    }

    this.SetupDatabase = (dir) => {
        path = dir
    
        fs.mkdir(dir, (err) => {
            console.log('Database has been set up correctly.')
        })
    }

    this.ReadAllData = (dbName) => {
        fs.readFile(`${path}/${dbName}.json`, 'utf-8', (err, data) => {
            return JSON.parse(data)
        })
    }

    this.SearchData = (dbName, searchData) => {

        let arr = new Array()

        fs.readFile(`${path}/${dbName}.json`, 'utf-8', (err, data) => {
            if(err) {
                console.error(`Database ${dbName} does not exists.`)
            }
            else {
                var jsonData = JSON.parse(data)

                for(let i = 0; i < jsonData.length; i++) {
                    let dataToSearch = JSON.stringify(searchData).substring(1).slice(0,-1)

                    if(JSON.stringify(jsonData[i]).includes(dataToSearch)) {
                        arr.push(jsonData[i])
                    }
                }
            }
        })

        return arr
    }
}