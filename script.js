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

  // Create initial fireworks
  createFireworks()

  // Intense fireworks display on page load
  function createIntenseFireworks() {
    let fireworksCreated = 0
    const totalFireworks = 50 * 10 // 50 fireworks per second for 10 seconds

    function createFirework() {
      const firework = document.createElement("div")
      firework.className = "firework"

      // Random position
      const posX = Math.random() * window.innerWidth
      const posY = Math.random() * window.innerHeight * 0.7

      firework.style.left = `${posX}px`
      firework.style.top = `${posY}px`

      // Random color
      const hue = Math.floor(Math.random() * 360)
      firework.style.backgroundColor = `hsl(${hue}, 100%, 50%)`
      firework.style.boxShadow = `0 0 20px 10px hsl(${hue}, 100%, 60%)`

      fireworksContainer.appendChild(firework)

      // Create particles
      createParticles(posX, posY, hue)

      // Remove firework after animation
      setTimeout(() => {
        firework.remove()
      }, 5000)

      fireworksCreated++

      if (fireworksCreated < totalFireworks) {
        setTimeout(createFirework, 20) // Create a new firework every 20ms (50 per second)
      }
    }

    createFirework()
  }

  // Start the intense fireworks display
  createIntenseFireworks()

  // Update countdown every second
  const countdown = setInterval(() => {
    // Get current date and time
    const now = new Date().getTime()

    // Calculate the time remaining
    const timeRemaining = releaseDate - now

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

    // Add leading zeros if needed
    const formattedDays = String(days).padStart(2, "0")
    const formattedHours = String(hours).padStart(2, "0")
    const formattedMinutes = String(minutes).padStart(2, "0")
    const formattedSeconds = String(seconds).padStart(2, "0")

    // Update the countdown display
    daysElement.textContent = formattedDays
    hoursElement.textContent = formattedHours
    minutesElement.textContent = formattedMinutes
    secondsElement.textContent = formattedSeconds

    // Add pulse animation to the seconds element
    secondsElement.classList.add("pulse")
    setTimeout(() => {
      secondsElement.classList.remove("pulse")
    }, 900)

    // If countdown is over
    if (timeRemaining < 0) {
      clearInterval(countdown)
      daysElement.textContent = "00"
      hoursElement.textContent = "00"
      minutesElement.textContent = "00"
      secondsElement.textContent = "00"

      // Show launch message
      countdownElement.style.display = "none"
      launchMessageElement.style.display = "block"
      notifyButton.textContent = "PLAY NOW"

      // Create celebratory fireworks
      setInterval(createFireworks, 2000)

      // Play theme song automatically
      if (!isPlaying) {
        themeAudio.play()
        isPlaying = true
        audioToggle.classList.remove("muted")
      }
    }
  }, 1000)

  // Notify button click event
  notifyButton.addEventListener("click", () => {
    alert("Thank you! You will be notified when RAMAYAN: THE EPIC QUEST launches.")
  })

  // Fireworks animation
  function createFireworks() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const firework = document.createElement("div")
        firework.className = "firework"

        // Random position
        const posX = Math.random() * window.innerWidth
        const posY = Math.random() * window.innerHeight * 0.7

        firework.style.left = `${posX}px`
        firework.style.top = `${posY}px`

        // Random color
        const hue = Math.floor(Math.random() * 360)
        firework.style.backgroundColor = `hsl(${hue}, 100%, 50%)`
        firework.style.boxShadow = `0 0 20px 10px hsl(${hue}, 100%, 60%)`

        fireworksContainer.appendChild(firework)

        // Create particles
        createParticles(posX, posY, hue)

        // Remove firework after animation
        setTimeout(() => {
          firework.remove()
        }, 5000)
      }, i * 500)
    }
  }

  function createParticles(x, y, hue) {
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      // Position at firework center
      particle.style.left = `${x}px`
      particle.style.top = `${y}px`

      // Random color variation
      const particleHue = hue + Math.random() * 20 - 10
      particle.style.backgroundColor = `hsl(${particleHue}, 100%, 50%)`

      // Random direction
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * 150 + 100
      const translateX = Math.cos(angle) * distance
      const translateY = Math.sin(angle) * distance

      // Set CSS variables for the animation
      particle.style.setProperty("--tx", `${translateX}px`)
      particle.style.setProperty("--ty", `${translateY}px`)

      fireworksContainer.appendChild(particle)

      // Remove particle after animation
      setTimeout(() => {
        particle.remove()
      }, 5000)
    }
  }
})

