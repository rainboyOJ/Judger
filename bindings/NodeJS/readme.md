## 安装

先安装`judger`

```
sudo apt install libseccomp-dev
makedir build && cd build && cmake .. && make
sudo make install
```

然后

```
npm install
npm run build
npm run test
```

或者

```
yarn
yarn test
```



## demo

```
cd demo/node
```

### 普通测试

```
sudo node demo.js
```

### 测试freopen

```
sudo node demo_node_freopen.js
```

## 说明

参考 https://docs.onlinejudge.me/#/judger/api 和 本Nodejs的bindings源代码 

多了一个参数`cwd`,改变测试程序得`work path`

如果测试noi比赛所使用的`freopen`输入输出重定向,参考:`demo/node/demo_node_freopen.js`.
