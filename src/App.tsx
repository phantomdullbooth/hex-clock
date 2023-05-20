import { useCallback, useState } from 'react'


function App() {
  const [time, setTime] = useState("")
  const [textColor, setTextColor] = useState("")

  function getRGB(c: any) {
    return parseInt(c, 16) || c
  }

  function getsRGB(c: any) {
    return getRGB(c) / 255 <= 0.03928
      ? getRGB(c) / 255 / 12.92
      : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4)
  }

  function getLuminance(hexColor: any) {
    return (
      0.2126 * getsRGB(hexColor.substr(1, 2)) +
      0.7152 * getsRGB(hexColor.substr(3, 2)) +
      0.0722 * getsRGB(hexColor.substr(-2))
    )
  }

  function getContrast(f: string, b: string) {
    const L1 = getLuminance(f)
    const L2 = getLuminance(b)
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
  }

  const getTextColor = useCallback((bgColor: string) => {
    const whiteContrast = getContrast(bgColor, '#ffffff')
    const blackContrast = getContrast(bgColor, '#000000')

    setTextColor(whiteContrast > blackContrast ? '#ffffff' : '#000000')
    // return whiteContrast > blackContrast ? '#ffffff' : '#000000'
  }, [])

  useState(() => {


    function getTime() {
      const date = new Date()

      const hour = date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours().toString()
      const minute = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes().toString()
      const second = date.getSeconds() < 10 ? "0" + date.getSeconds().toString() : date.getSeconds().toString()

      const bgColor = hour + minute + second

      setTime(bgColor)
      getTextColor(bgColor)

    }


    setInterval(function () {
      getTime()
    }, 1000)

    getTime()

  })

  return (
    <main style={{ backgroundColor: "#" + time, color: textColor }}>
      <div className="container">
        <h1>Current time: #{time}</h1>
      </div>
    </main>
  )
}

export default App
