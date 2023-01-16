const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const mongodbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.DB_NAME;
const PORT = process.env.PORT;
const Thread = require('./models/Thread');

app.use(express.json());
// 静的なディレクトリにpublicを指定
app.use(express.static('public'));

// mongooseを使ってmongoDBと接続
// <password>の部分を設定したパスワードに変更する
// mongodb.net/の後に好きなデータベース名を付けれる
mongoose
  .connect(
    `mongodb+srv://kazutaka:${mongodbPassword}@cluster0.m1ksvc9.mongodb.net/${dbName}?retryWrites=true&w=majority`
  )
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err));

//getメソッド
app.get('/api/v1/threads', async (req, res) => {
  try {
    // await MyModel.find({})で全てのデータ取得;
    const allThreads = await Thread.find({});
    res.status(200).json(allThreads);
  } catch (err) {
    console.log(err);
  }
});

// postメソッド
app.post('/api/v1/thread', async (req, res) => {
  try {
    // await Model.create({ foo: 'original', nested: { bar: 'original' } })でデータ追加
    const createThread = await Thread.create(req.body);
    res.status(200).json(createThread);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, console.log('server running'));
