

const { spawn, exec } = require('child_process');
const { exit, platform } = require('process');
const { unlinkSync, readFile, appendFileSync, writeFileSync, mkdirSync } = require('fs');
const pkg = require("../package.json")



let d = null
let p = platform


async function run_script(command, args, callback) {
    // source: https://stackoverflow.com/questions/14332721/node-js-spawn-child-process-and-get-terminal-output-live
    var child = spawn(command, args);
    var scriptOutput = "";

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function(data) {

        data=data.toString();
        scriptOutput+=data;
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function(data) {

        data=data.toString();
        scriptOutput+=data;
    });

    child.on('error', function(err) {
        scriptOutput=""
    });

    child.on('close', function(code) {
        callback(scriptOutput,code);
    });
}


exports.dev_sysinfo = function() {
    console.log(__dirname)
    readFile(__dirname +"/settings.json",(err, data) => {
        if(err){
            console.log(err)
            exit()
        }
        // Do something with the data
        d = JSON.parse(data)
        let tempStr = ""
        let tempJSON = {}

        try {
            mkdirSync(d["outputs"]["outputDir"])
        } catch (error) {}
       
        try {
            unlinkSync(process.cwd()+"/"+d["outputs"]["outputDir"]+d["outputs"]["outputName"]+".txt")
            unlinkSync(process.cwd()+"/"+d["outputs"]["outputDir"]+d["outputs"]["outputName"]+".json")
        } catch (error) {}
        
        for (const key in d[p]) {
            d[p][key].forEach(element => {
                let e = element.split(" ")
                run_script(e[0],e.slice(1),(o)=>{
                    if( d["outputs"]["text"]){
                        o = o.replaceAll("\n","\n\t")
                        tempStr  = element+"\n\t"+o+"\n"
                        appendFileSync(process.cwd()+"/"+d["outputs"]["outputDir"]+d["outputs"]["outputName"]+".txt", tempStr);
                    }
                    if( d["outputs"]["json"]){
                        tempJSON[element] = o
                        writeFileSync(process.cwd()+"/"+d["outputs"]["outputDir"]+d["outputs"]["outputName"]+".json", 
                        JSON.stringify(tempJSON));
                    }
                    
                })
            });
        }
        exec('start "" '+"\""+process.cwd()+"\\"+d["outputs"]["outputDir"]+"\"")
       
        
      })
}