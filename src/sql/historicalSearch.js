var myDB={
    name:'school',
    version:1,
    db:null,
    ojstore:{
        name:'teachers',//存储空间表的名字
        keypath:'id',//主键
        indexKey:'age'//年龄索引
    }
};

var INDEXDB = {
    indexedDB:window.indexedDB||window.webkitindexedDB,
    IDBKeyRange:window.IDBKeyRange || window.webkitIDBKeyRange,//键范围
    openDB:function(dbname,dbversion,callback){
        //建立或打开数据库，建立对象存储空间(ObjectStore)
        var self = this;
        var    version = dbversion || 1;
        var request = self.indexedDB.open(dbname,version);
        request.onerror = function(e){
            console.log(e.currentTarget.error.message);
        };
        request.onsuccess = function(e){
            myDB.db = e.target.result;
            console.log('成功建立并打开数据库:'+myDB.name+' version'+dbversion);
        };
        request.onupgradeneeded=function(e){
            var db=e.target.result,transaction= e.target.transaction,store;
            if(!db.objectStoreNames.contains(myDB.ojstore.name)){
                //没有该对象空间时创建该对象空间
//                    store = db.createObjectStore(myDB.ojstore.name,{keyPath:myDB.ojstore.keypath});
                store = db.createObjectStore(myDB.ojstore.name,{autoIncrement: true});
//                    db.createObjectStore('students',{autoIncrement: true});
                console.log('成功建立对象存储空间：'+myDB.ojstore.name);
                self.storeIndex(store,myDB.ojstore.indexKey)
            }
        }


    },
    deletedb:function(dbname){
        //删除数据库
        var self = this;
        self.indexedDB.deleteDatabase(dbname);
        console.log(dbname+'数据库已删除')
    },
    closeDB:function(db){
        //关闭数据库
        db.close();
        console.log('数据库已关闭')
    },
    addData:function(db,storename,data){
        //添加数据，重复添加会报错
        var store = db.transaction(storename,'readwrite').objectStore(storename),request;
        for(var i = 0 ; i < data.length;i++){
            request = store.add(data[i]);
            request.onerror = function(){
                console.error('add添加数据库中已有该数据')
            };
            request.onsuccess = function(){
                console.log('add添加数据已存入数据库')
            };
        }

    },
    cursorGetData:function(db,storename,keyRange){
        //通过游标查询记录
        var keyRange = keyRange || '';
        var store = db.transaction(storename,'readwrite').objectStore(storename);
        var request = store.openCursor(keyRange);
        request.onsuccess = function(e){
            // console.log('游标开始查询')
            var cursor = e.target.result;
            if(cursor){//必须要检查
                console.log(cursor);
                cursor.continue();//遍历了存储对象中的所有内容
            }else{
                // console.log('游标查询结束')
            }
        };
    },
    cursorGetDataByIndex:function(db,storename,keyRange){
        //通过索引游标查询记录
        var keyRange = keyRange || '';
        var store = db.transaction(storename,'readwrite').objectStore(storename);
        var request = store.index("age").openCursor(keyRange);
        request.onsuccess = function(e){
            console.log('游标开始查询')
            var cursor = e.target.result;
            if(cursor){//必须要检查
                console.log(cursor);
                cursor.continue();//遍历了存储对象中的所有内容
            }else{
                console.log('游标查询结束')
            }
        };
    },
    cursorUpdateData:function(db,storename){
        //通过游标更新记录
        var keyRange = keyRange || '';
        var store = db.transaction(storename,'readwrite').objectStore(storename);
        var request = store.openCursor();
        request.onsuccess = function(e){
            console.log('游标开始查询')
            var cursor = e.target.result,
                value,
                updateRequest;
            if(cursor){//必须要检查
                console.log(cursor);
                if(cursor.key == 1002){
                    console.log('游标开始更新')
                    value = cursor.value;
                    value.age=38;
                    updateRequest = cursor.update(value);
                    updateRequest.onerror = function(){
                        console.log('游标更新失败');
                    };
                    updateRequest.onsuccess = function(){
                        console.log('游标更新成功');
                    }
                }else{
                    cursor.continue();
                }
            }
        };
    },
    cursorDeleteData:function(db,storename){
        //通过游标删除记录
        var keyRange = keyRange || '';
        var store = db.transaction(storename,'readwrite').objectStore(storename);
        var request = store.openCursor();
        request.onsuccess = function(e){
            var cursor = e.target.result,
                value,
                deleteRequest;
            if(cursor){
                if(cursor.key == 1003){
                    deleteRequest = cursor.delete();//请求删除当前项
                    deleteRequest.onerror = function(){
                        console.log('游标删除该记录失败');
                    };
                    deleteRequest.onsuccess = function(){
                        console.log('游标删除该记录成功')
                    };
                }else{
                    cursor.continue();
                }
            }
        };
    },
    storeIndex:function(store,indexKey){
        //创建索引
        var index = store.createIndex(indexKey,indexKey,{unique:false});
        console.log('创建索引'+indexKey+'成功')
    }
}
var teachers=[{
    id:1001,
    name:"Byron",
    age:21
},{
    id:1002,
    name:"Frank",
    age:22
},{
    id:1003,
    name:"Aaron",
    age:23
},{
    id:1004,
    name:"Aaron",
    age:24
},{
    id:1005,
    name:"Byron",
    age:24
},{
    id:1006,
    name:"Frank",
    age:30
},{
    id:1007,
    name:"Aaron",
    age:26
},{
    id:1008,
    name:"Aaron",
    age:27
}];

INDEXDB.openDB(myDB.name,myDB.version);
setTimeout(function(){
    /*
     * 游标方法调用
     */
    console.log('****************添加数据****************************');
    INDEXDB.addData(myDB.db,myDB.ojstore.name,teachers);
    //console.log('****************游标更新数据id1002更新其age为38****************************');
    //INDEXDB.cursorUpdateData(myDB.db,myDB.ojstore.name)
    // console.log('******************游标删除id为1003的数据************');
    // INDEXDB.cursorDeleteData(myDB.db,myDB.ojstore.name);
    // console.log('******************关闭数据库************');
    // INDEXDB.closeDB(myDB.db);
    // console.log('******************删除数据库************');
    // INDEXDB.deletedb(myDB.db);

    /*
     *游标键范围方法调用
     */
    var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange
    // console.log('******************查找1004对象************')
    // var onlyKeyRange = IDBKeyRange.only(1004);
    // INDEXDB.cursorGetData(myDB.db,myDB.ojstore.name,onlyKeyRange);
    // console.log('******************查找从1004对象开始************');
    // var lowerBoundKeyRange = IDBKeyRange.lowerBound(1004);
    // INDEXDB.cursorGetData(myDB.db,myDB.ojstore.name,lowerBoundKeyRange);
    // console.log('******************查找从1004对象开始不包括1004************')
    // var lowerBoundKeyRangeTrue = IDBKeyRange.lowerBound(1004,true);
    // INDEXDB.cursorGetData(myDB.db,myDB.ojstore.name,lowerBoundKeyRangeTrue);
    // console.log('******************查找到1004对象结束************');
    // var upperBoundKeyRange = IDBKeyRange.upperBound(1004);
    // INDEXDB.cursorGetData(myDB.db,myDB.ojstore.name,upperBoundKeyRange);
    // console.log('******************查找到1004对象结束不包括1004************');
    // var upperBoundKeyRangeTrue = IDBKeyRange.upperBound(1004,true);
    // INDEXDB.cursorGetData(myDB.db,myDB.ojstore.name,upperBoundKeyRangeTrue);
    // console.log('******************查找到1002到1004对象************');
    // var boundKeyRange = IDBKeyRange.bound(1002,1004);
    // INDEXDB.cursorGetData(myDB.db,myDB.ojstore.name,boundKeyRange);
    // console.log('******************查找到1002到1004对象不包括1002************');
    // var boundKeyRangeLowerTrue = IDBKeyRange.bound(1002,1004,true);
    // INDEXDB.cursorGetData(myDB.db,myDB.ojstore.name,boundKeyRangeLowerTrue);
    // console.log('******************查找到1002到1004对象包括1002不包括1004************');
    // var boundKeyRangeUpperTrue = IDBKeyRange.bound(1002,1004,false,true);
    // INDEXDB.cursorGetData(myDB.db,myDB.ojstore.name,boundKeyRangeUpperTrue);
    // console.log('******************查找到1002到1004对象不包括1002不包括1004************');
    // var boundKeyRangeLTUT = IDBKeyRange.bound(1002,1004,true,true);
    // INDEXDB.cursorGetData(myDB.db,myDB.ojstore.name,boundKeyRangeLTUT);

    /*
     *存储键游标查询与索引键游标查询对比
     */
    // console.log('******************存储键游标查询************')
    // var onlyKeyRange = IDBKeyRange.only(1004);
    // INDEXDB.cursorGetData(myDB.db,myDB.ojstore.name,onlyKeyRange);
    // console.log('******************索引键游标查询************')
    // var onlyKeyRange = IDBKeyRange.only(30);
    // INDEXDB.cursorGetDataByIndex(myDB.db,myDB.ojstore.name,onlyKeyRange);
},800)