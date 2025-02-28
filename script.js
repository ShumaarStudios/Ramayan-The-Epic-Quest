document.addEventListener("DOMContentLoaded", () => {
  // Set the release date: October 2, 2025, at 12 PM
  const releaseDate = new Date("October 2, 2025 12:00:00").getTime()

  // DOM elements
  const daysElement = document.getElementById("days")
  const hoursElement = document.getElementById("hours")
  const minutesElement = document.getElementById("minutes")
  const secondsElement = document.getElementById("seconds")
  const countdownElement = document.getElementById("countdown")
  const launchMessageElement = document.getElementById("launch-message")
  const notifyButton = document.getElementById("notify-btn")
  const fireworksContainer = document.getElementById("fireworks")
  const themeAudio = document.getElementById("theme-song")
  const audioToggle = document.getElementById("audio-toggle")

  // Audio controls
  let isPlaying = false

  audioToggle.addEventListener("click", () => {
    if (isPlaying) {
      themeAudio.pause()
      audioToggle.classList.add("muted")
    } else {
      themeAudio.play()
      audioToggle.classList.remove("muted")
    }
    isPlaying = !isPlaying
  })

  // Update countdown every second
  const countdown = setInterval(() => {
    const now = new Date().getTime()
    const timeRemaining = releaseDate - now

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

    daysElement.textContent = String(days).padStart(2, "0")
    hoursElement.textContent = String(hours).padStart(2, "0")
    minutesElement.textContent = String(minutes).padStart(2, "0")
    secondsElement.textContent = String(seconds).padStart(2, "0")

    secondsElement.classList.add("pulse")
    setTimeout(() => secondsElement.classList.remove("pulse"), 900)

    if (timeRemaining < 0) {
      clearInterval(countdown)
      daysElement.textContent = "00"
      hoursElement.textContent = "00"
      minutesElement.textContent = "00"
      secondsElement.textContent = "00"

      countdownElement.style.display = "none"
      launchMessageElement.style.display = "block"
      notifyButton.textContent = "PLAY NOW"

      startFireworks()

      if (!isPlaying) {
        themeAudio.play()
        isPlaying = true
        audioToggle.classList.remove("muted")
      }
    }
  }, 1000)

  notifyButton.addEventListener("click", () => {
    alert("Thank you! You will be notified when RAMAYAN: THE EPIC QUEST launches.")
  })

  function startFireworks() {
    let fireworkInterval = setInterval(() => {
      for (let i = 0; i < 50; i++) {
        createFirework()
      }
    }, 1000) // 50 fireworks per second

    setTimeout(() => {
      clearInterval(fireworkInterval)
    }, 10000) // Stop after 10 seconds
  }

  function createFirework() {
    const firework = document.createElement("div")
    firework.className = "firework"

    const posX = Math.random() * window.innerWidth
    const posY = Math.random() * window.innerHeight * 0.7

    firework.style.left = `${posX}px`
    firework.style.top = `${posY}px`

    const hue = Math.floor(Math.random() * 360)
    firework.style.backgroundColor = `hsl(${hue}, 100%, 50%)`
    firework.style.boxShadow = `0 0 20px 10px hsl(${hue}, 100%, 60%)`

    fireworksContainer.appendChild(firework)

    createParticles(posX, posY, hue)

    setTimeout(() => firework.remove(), 5000)
  }

  function createParticles(x, y, hue) {
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      particle.style.left = `${x}px`
      particle.style.top = `${y}px`

      const particleHue = hue + Math.random() * 20 - 10
      particle.style.backgroundColor = `hsl(${particleHue}, 100%, 50%)`

      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * 150 + 100
      const translateX = Math.cos(angle) * distance
      const translateY = Math.sin(angle) * distance

      particle.style.setProperty("--tx", `${translateX}px`)
      particle.style.setProperty("--ty", `${translateY}px`)

      fireworksContainer.appendChild(particle)

      setTimeout(() => particle.remove(), 5000)
    }
  }
})
