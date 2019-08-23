var {execSync:exec} = require("child_process")
var judge = require("../../bindings/NodeJS")

exec('gcc freopen.c -o freopen')


let result = judge.run({
    exe_path:`${__dirname}/freopen`,
    cwd:__dirname,
    gid:0,
    uid:0
})

console.log(result)

