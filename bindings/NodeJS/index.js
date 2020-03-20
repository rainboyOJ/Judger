const popen = require("./build/Release/popen.node")
exports.run = function({
  max_cpu_time,
  max_real_time,
  max_memory,
  memory_limit_check_only,
  max_stack,
  max_process_number,
  max_output_size,
  exe_path,
  input_path,
  output_path,
  error_path,
  args,
  env,
  log_path,
  seccomp_rule_name,
  uid=0,
  gid=0,
  cwd="",
  },
  judger_bin_path="/usr/lib/judger/libjudger.so"
){
  let popen_args = []

  popen_args.push(judger_bin_path)
  let int_vars = {
    max_cpu_time,
    max_real_time,
    max_memory,
    memory_limit_check_only,
    max_stack,
    max_process_number,
    max_output_size,
    uid,gid,
    exe_path,
    input_path,
    output_path,
    error_path,
    log_path,
    seccomp_rule_name,
  }

  for( let key in  int_vars){
    popen_args.push(`--${key}=${int_vars[key]}`)
  }

  let array_vars = { args,env }
  for( let key in array_vars){
    if( array_vars[key] instanceof Array && array_vars[key].length > 0 ){
      for( let content of array_vars[key])
        popen_args.push(`--${key}=${content}`)
    }
  }

  //console.log(popen_args.join(" "))
  let pass_args = popen_args.join(" ")
  if( cwd && cwd.length  > 0){
    pass_args = `cd ${cwd};`+pass_args
    //popen_args.push()
  }
  let res = popen.popen(popen_args.join(" "))
  console.log(res)

}


exports.UNLIMITED=-1;
exports.VERSION=0x020101;

exports.RESULT_SUCCESS                  =0;
exports.RESULT_WRONG_ANSWER             =-1;
exports.RESULT_CPU_TIME_LIMIT_EXCEEDED  =1;
exports.RESULT_REAL_TIME_LIMIT_EXCEEDED =2;
exports.RESULT_MEMORY_LIMIT_EXCEEDED    =3;
exports.RESULT_RUNTIME_ERROR            =4;
exports.RESULT_SYSTEM_ERROR             =5;

exports.ERROR_INVALID_CONFIG    =-1;
exports.ERROR_FORK_FAILED       =-2;
exports.ERROR_PTHREAD_FAILED    =-3;
exports.ERROR_WAIT_FAILED       =-4;
exports.ERROR_ROOT_REQUIRED     =-5;
exports.ERROR_LOAD_SECCOMP_FAILED=-6;
exports.ERROR_SETRLIMIT_FAILED  =-7;
exports.ERROR_DUP2_FAILED       =-8;
exports.ERROR_SETUID_FAILED     =-9;
exports.ERROR_EXECVE_FAILED     =-10;
exports.ERROR_SPJ_ERROR         =-11;
