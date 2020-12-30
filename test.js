const fetch = require('node-fetch')

const hoge = 'あ'

const returnText = (score) => {
  return {
    type: 'text',
    text: '成績は' + score + 'です.'
  }
}

const returnMessage = (inputMessage) => {
    if (inputMessage === 'あ') { 
      const api_url = 'https://script.google.com/macros/s/AKfycbz2XxvmlqZC2gsYjPn1BAAJxwdcR5Cth_5_ef-ef-7yZ8zSQAo/exec'
      
      // fetchはPromiseを返す
      // 非同期処理なのでthenの中身は「APIレスポンス返ってきたらその時実行するよん」という処理になる
      fetch(api_url).then((res) => {
        return res.json()
      })
      .then((data) => {
        const totalPoints = data[0].Total_points
        const result = returnText(totalPoints)

	      console.log('ここで表示するよ')
        console.log(result)
      })
      .catch((err) => {
        console.error( err )
      })
    } else {
      console.log({ type: 'text', text: 'よくわかりません' })
    }
}

console.log('実行するよ')
returnMessage(hoge)
