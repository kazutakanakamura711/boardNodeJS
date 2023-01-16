const mongoose = require('mongoose');

// データスキーマ構築
const ThreadSchema = new mongoose.Schema({
  // データの骨格をjson形式で定義
  title: {
    type: String,
    required: true,
    maxlength: 20,
  },
  content: {
    type: String,
    required: true,
  },
});

// server.jsで使えるようにexport
// mongoose.modelでThreadSchemaをThreadという名前でexportする
module.exports = mongoose.model('Thread', ThreadSchema);
