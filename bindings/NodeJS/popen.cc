#include <node_api.h>
#include <unistd.h>
#include <cstdlib>
#include <cstring>
#include <cstdio> 
#include <sys/wait.h>

namespace demo {

    napi_value fn_popen(napi_env env, napi_callback_info info) {
        napi_value fn_popen_ret;
        napi_status status;

        /* == 得到参数 == */
        size_t argc = 1;
        napi_value args[1];
        status = napi_get_cb_info(env, info, &argc, args, NULL, NULL);

        //napi_valuetype valuetype0;
        //status = napi_typeof(env, args[0], &valuetype0);
        //cout << valuetype0 << endl;
        
        char buf[1024];
        size_t siz;
        napi_get_value_string_utf8(env,args[0],buf,sizeof(buf),&siz);

        //printf("%s\n",buf);

        /* == 调用C popen == */
        FILE *_result_f;
        //printf("%s \n\n",_args.c_str());
        if(( _result_f = popen(buf,"r"))==NULL){
            return nullptr;
        }

        char result[1024];
        char * p = result;
        memset(buf,0,sizeof(buf));
        memset(result,0,sizeof(result));
        while(fgets(buf,sizeof(buf),_result_f)){
            int len = strlen(buf);
            memcpy(p,buf,len);
            p +=len;
        }
        pclose(_result_f);

        status = napi_create_string_utf8(env, result, NAPI_AUTO_LENGTH, &fn_popen_ret);
        if (status != napi_ok) return nullptr;
        return fn_popen_ret;
    }

    napi_value init(napi_env env, napi_value exports) {
        napi_status status;
        napi_value fn;

        status = napi_create_function(env, nullptr, 0, fn_popen, nullptr, &fn);
        if (status != napi_ok) return nullptr;
        status = napi_set_named_property(env, exports, "popen", fn);
        if (status != napi_ok) return nullptr;
        return exports;
    }

    NAPI_MODULE(NODE_GYP_MODULE_NAME, init)

}  // namespace demo
