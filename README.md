# BT_201503_fluentd_test2
======

原BTtest

本文將說明mongo之insert壓力測試


## 環境準備install

執行環境中需安裝[node@0.10.x](http://www.evernote.com/shard/s420/sh/cb31e9f1-1ca5-43e6-b156-b38cc6e7eb52/dd102397bb6934564c609bb1629b7bd2)、fluent、及mongoDB@2.4.11 (以上版本)


安裝node_modules
```bash
$ cd fluentd_test2
$ npm install
```

問題1
```bash
./node_modules/connect-mongo/lib/connect-mongo.js:178
    Error: Error connecting to database: failed to connect to [127.0.0.1:27017]
```

解決1


`$ vi ./node_modules/connect-mongo/lib/connect-mongo.js`
```js
20 var defaultOptions = {host: '127.0.0.1',
                      	port: 40000,
```
[O] <font color="0080ff">將27017改成執行中的port<font>

檢查mongo開啟
```bash
$ mongo --port 40000
MongoDB shell version: 2.4.11
connecting to: test
>
```

檢查fluentd開啟
```bash
$ sudo /etc/init.d/td-agent status
 * ruby is running
```

檢查node開啟

```bash
$ cd ~/nodejs/fluent_test2/
$ node app
Express server listening on port 8000
connect mongodb success...
```


## 環境設定

主要設定fluentd中in來源及、out儲存的設定，本文架構在 node---fluent---mongo 之上。

fluentd conf:
```bash
$ sudo vim /etc/td-agent/td-agent.conf
```

### 第一組 file.json -> mongo

out to mongo
```vim
<match mongo.**>
  buffer_type memory
  buffer_chunk_limit 256m
  buffer_queue_limit 4096m
  flush_interval 10s
  retry_limit 17
  retry_wait 1s

  # plugin type
  type mongo
  database fluentd
  collection logs
  host localhost
  port 27017
  #port 40000
  flush_interval 10s
</match>
```

in from json file
```bash
<source>
  type tail
  format json

# config file 裡的 path不要用 ~取代 /home/btserver ，否則會 error，造成無法塞資料。
  path /home/btserver/fluentd/data/*
  pos_file /home/btserver/fluentd/record/fluentd.pos
  tag mongo.test

  read_from_head true
  refresh_interval 15
</source>
```

###第二組 node.log4j -> stdout

in from port *使用forward而非tcp，因為fluent不建議使用*
```bash
<source>
  type forward
  # port 8000
</source>
```

out to stdout
```bash
<match fluent.test.**>
  type stdout
</match>
```

out to mongodb
```bash
<match fluent.test.**>
  buffer_type memory
  buffer_chunk_limit 256m
  buffer_queue_limit 1024m
  flush_interval 10s
  retry_limit 17
  retry_wait 1s

  # plugin type
  type mongo
  database fluentd
  collection nodelogs
   #host localhost
   #port 27017
  host 127.0.0.1
  port 40000
  # interval
</match>

```

```js
var logger = require('fluent-logger');
	logger.configure('fluent', {
		host : 'localhost',
		port : 24224,
		//timeout : 3.0
	});
```
====

## node設定

下載此app

```bash
$ cd ~/nodejs/
$ git clone https://github.com/liyuqi/BTtest.git
$ cd BTtest/fluentd_test2
$ sudo chmod 777 -R fluent_test2
$ cd fluent_test2
$ sudo npm install
```

編輯app.js

```$ vim ~/nodejs/fluentd_test2/app.js```

```js
var dbevents = monk('127.0.0.1:40000/events');
```

編輯settings.js port
```js
module.exports = {
	cookie_secret : 'secret_meteoric',
	db : 'events',
	host : '127.0.0.1',
	port : 40000
}
```

編輯connect-mongo.js

控制mongo連線, 預設為127.0.0.1:27017/test, 為符合環境需求, 應改為自己機器的 ip:port/db

```bash
$ vim node_modules/connect-mongo/lib/connect-mongo.js
```

```js
var defaultOptions = {host: '127.0.0.1',
                      port: 40000,
```

控制port:

一台server上若要開啟多個node server，需複製fluent_test2資料夾，並修改成不同port ex(預設為3000)
```js
app.set('port', process.env.PORT || 8000);
```

進入點:
```js
app.get('/ftest3', ftest.insert3(dbevents));//insert mongo x 10 (8kb) *****
```

在browser上開啟 localhost:8000/ftest3 鍵入F5刷新

[http://localhost:8000/ftest3](http://localhost:8000/ftest3)

![](https://github.com/liyuqi/BTtest/browser.png?raw=true)

檢查mongo有無新增筆數, 刷新一次10筆

```bash
$ mongo
MongoDB shell version: 2.4.11
connecting to: test
> use events
> db.events.count()
10
>
```

## jmeter 設定##

`$ sh jmeter.sh`

`測試計畫`右鍵 > `新增` > `Threads(Users)` > `setUp Thread Group` 

執行緒數量 > `10` , 啟動延遲 > `1` , 迴圈次數 > `5` 將會打5000筆

`setUp Thread Group` (右鍵) > `新增` > `接聽` > `彙整報告`

`setUp Thread Group` (右鍵) > `新增` > `取樣` > `HTTP 要求`

`setUp Thread Group` (右鍵) > `新增` > `設定元素` > `HTTP 要求預設值`

web server IP > `127.0.0.1` , port > `8000` , path `/ftest3`

執行壓測---
