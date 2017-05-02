/*
*创建schema @author Sheldon-Yee 
*/
//分别定义了blog和blogCategory的Schema，即数据骨架

let mongoose , {Schema} = require('mongoose');

//创建blog的数据存储 Schema
exports.blogSchema = new Schema({
  title:  String,
  content:   String,//html
  rawContent:String,//MD
  category:String,//分类
  date: { type: String, default:()=>{return new Date().toLocaleString()}}
});

//创建blog分类
exports.categorySchema = new Schema({
  category:  String
});

