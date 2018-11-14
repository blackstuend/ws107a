const Koa=require('koa')
const app=new Koa()
const logger = require('koa-logger')
const koaBody = require('koa-body')
const serve = require('koa-static');
const views = require('koa-views');
const path=require('path')
const session = require('koa-session');
const favicon = require('koa-favicon');
const content=require('./model/content_router')
const account=require('./model/account_router')
const Router = require('koa-router')
const router=new Router;
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/blog');


app.keys = ['key1'];
app.use(session(app));
app.use(serve(__dirname + '/public'));
app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }));
app.use(logger())
app.use(koaBody())
app.use(favicon('favicon.ico'));

app.use(account.routes())
  .use(account.allowedMethods())
app.use(content.routes())
  .use(content.allowedMethods())
app.listen('3000',()=>
console.log('listen on 3000 port'))