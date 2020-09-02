var {execSync:exec} = require("child_process")
var judge = require("../../bindings/NodeJS")

exec('gcc freopen.c -o freopen')


let result = judge.run({
    exe_path:`${__dirname}/freopen`,
    seccomp_rule_name:"c_cpp_file_io",
    cwd:__dirname,
    gid:-1,
    uid:-1
})

console.log(result)

