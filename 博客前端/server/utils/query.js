// 首先链接mysql数据库
import mysql from 'mysql'
import {db, dbName} from '../config.js'
import fs from 'fs'
import path from 'path'
// 需要创建一个数据库,并且能够将sql文件下的sql文件执行
let pool;
// 同步读取文件
const sqlContent = fs.readFileSync(path.resolve(__dirname,'..','./sql/xk_blog.sql'),'utf-8')

// 链接数据库,括号内的参数可以是一个对象或者是一个url字符串,用于指定该链接所用的各种选项
const init = mysql.createConnection(db)
// 使用connect方法建立链接
init.connect()
// 判断如果数据库存在了,则不需要执行下面的代码


init.query('CREATE DATABASE lmp_blog',err=>{
    // .assign 方法会将两个对象进行合并,如果两者有冲突的话,后者会覆盖前者.
    Object.assign(db,dbName)
    // 第二次链接数据库,这时候,数据库xk_blog已经创建成功,这时候直接链接xk_blog数据库
    // 然后执行sql文件夹下的xk_blog.sql文件,对应表和测试数据就已经存在数据库里面了
    pool = mysql.createPool(db)
    if (err){
        console.log('lmp_blog database created already')
    }else{
        console.log('create lmp_blog Database')
        query(sqlContent).then(res=>{
            console.log('import sql is success')
        }).catch((err)=>{
            console.log('import sql is error')
        })
    }
})



// 关闭链接(end \ destory)
// 两种方法的区别:
// 1. end方法可以使用一个参数,指定关闭操作结束时的回调函数,关闭之前会将之前所有的查询操作执行完毕.
// 2. destory没有参数,会直接关闭链接
init.end()


// 封装一个query方法,方便我们进行sql语句的执行
export default function query (sql,values){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                reject(err);
            }else{
                connection.query(sql,values,(err,data)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(data);
                    }
                    connection.release()
                })
            }
        })
    })
}