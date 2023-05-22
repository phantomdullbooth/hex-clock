import { useState } from 'react'


function App() {
  const [day, setDay] = useState("")
  const [time, setTime] = useState("")


  useState(() => {


    function getTime() {
      const date = new Date()

      const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()
      const dayDate = date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate().toString()

      let year = date.getFullYear().toString()
      year = year[2] + year[3].toString()


      const hour = date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours().toString()
      const minute = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes().toString()
      const second = date.getSeconds() < 10 ? "0" + date.getSeconds().toString() : date.getSeconds().toString()

      const bgColor1 = month + dayDate + year
      const bgColor2 = hour + minute + second

      console.log(bgColor1, bgColor2)

      setDay(bgColor1)
      setTime(bgColor2)
    }


    setInterval(function () {
      getTime()
    }, 1000)

    getTime()

  })

  return (
    <main style={{ background: `linear-gradient(135deg, #${day} 30%, #${time} 100%)` }}>
      <div className="container">
      </div>
    </main>
  )
}

export default App
