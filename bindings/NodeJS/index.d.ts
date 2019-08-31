declare var Judger  : {

    run(args:Judger.judge_args):Judger.result

    UNLIMITED:-1
    VERSION:number
    RESULT_SUCCESS:0
    RESULT_WRONG_ANSWER:-1
    RESULT_CPU_TIME_LIMIT_EXCEEDED:1
    RESULT_REAL_TIME_LIMIT_EXCEEDED:2
    RESULT_MEMORY_LIMIT_EXCEEDED:3
    RESULT_RUNTIME_ERROR:4
    RESULT_SYSTEM_ERROR:5

    ERROR_INVALID_CONFIG:-1
    ERROR_FORK_FAILED:-2
    ERROR_PTHREAD_FAILED:-3
    ERROR_WAIT_FAILED:-4
    ERROR_ROOT_REQUIRED:-5
    ERROR_LOAD_SECCOMP_FAILED:-6
    ERROR_SETRLIMIT_FAILED:-7
    ERROR_DUP2_FAILED:-8
    ERROR_SETUID_FAILED:-9
    ERROR_EXECVE_FAILED:-10
    ERROR_SPJ_ERROR:-11
}

declare namespace Judger {
    export interface judge_args {
        max_cpu_time?:number
        max_real_time?:number
        max_memory?:number
        memory_limit_check_only?:number
        max_stack?:number
        max_process?:number
        max_output_size?:number
        exe_path?:string
        input_path?:string
        output_path?:string
        error_path?:string
        args?:string[]
        env?:string[]
        cwd?: string
        gid?:number
        uid?:number
    }
    export interface result {
        cpu_time: number
        real_time: number
        memory: number
        signal: number
        exit_code: number
        error: number
        result: number
    }
}

export= Judger
