// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize YouTube API
  loadYouTubeAPI()

  // Initialize countdown timer
  initCountdown()

  // Initialize fireworks
  initFireworks()

  // Initialize gallery and lightbox
  initGallery()

  // Initialize feature animations
  initFeatureAnimations()

  // Initialize audio controls
  initAudioControls()
})

// YouTube API
let youtubePlayer
let modalYoutubePlayer
let YT // Declare YT variable

function loadYouTubeAPI() {
  // Load the YouTube IFrame API
  const tag = document.createElement("script")
  tag.src = "https://www.youtube.com/iframe_api"
  const firstScriptTag = document.getElementsByTagName("script")[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
}

// This function will be called by the YouTube API once it's loaded
function onYouTubeIframeAPIReady() {
  // Create the player for the trailer section
  youtubePlayer = new YT.Player("youtube-player", {
    videoId: "dQw4w9WgXcQ", // Replace with your actual YouTube video ID
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      showinfo: 0,
      loop: 1,
      modestbranding: 1,
      playsinline: 1,
      mute: 1,
    },
    events: {
      onReady: onPlayerReady,
    },
  })

  // Create the player for the modal
  modalYoutubePlayer = new YT.Player("modal-youtube-player", {
    videoId: "dQw4w9WgXcQ", // Replace with your actual YouTube video ID
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 0,
      loop: 0,
      modestbranding: 1,
      playsinline: 1,
    },
  })

  // Set up video overlay click event
  document.getElementById("video-overlay").addEventListener("click", function () {
    this.style.display = "none"
    youtubePlayer.playVideo()
  })

  // Set up full trailer button
  document.getElementById("watch-full-trailer").addEventListener("click", () => {
    openTrailerModal()
  })
}

function onPlayerReady(event) {
  // Player is ready
  // Set up autoplay on scroll
  setupAutoplayOnScroll()
}

function setupAutoplayOnScroll() {
  const trailerSection = document.querySelector(".trailer-section")
  const videoOverlay = document.getElementById("video-overlay")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && videoOverlay.style.display !== "none") {
          videoOverlay.style.display = "none"
          youtubePlayer.playVideo()
        } else if (!entry.isIntersecting && videoOverlay.style.display === "none") {
          youtubePlayer.pauseVideo()
          videoOverlay.style.display = "flex"
        }
      })
    },
    { threshold: 0.7 },
  )

  observer.observe(trailerSection)
}

function openTrailerModal() {
  const modal = document.getElementById("trailer-modal")
  modal.style.display = "block"
  modalYoutubePlayer.playVideo()

  // Set up close button
  document.querySelector(".close-modal").addEventListener("click", () => {
    closeTrailerModal()
  })

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeTrailerModal()
    }
  })
}

function closeTrailerModal() {
  const modal = document.getElementById("trailer-modal")
  modal.style.display = "none"
  modalYoutubePlayer.pauseVideo()
}

// Countdown Timer
function initCountdown() {
  const releaseDate = new Date("October 2, 2025 00:00:00").getTime()

  function updateCountdown() {
    const now = new Date().getTime()
    const distance = releaseDate - now

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    document.getElementById("days").textContent = days.toString().padStart(2, "0")
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0")
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0")
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0")

    if (distance < 0) {
      clearInterval(countdownInterval)
      document.getElementById("days").textContent = "00"
      document.getElementById("hours").textContent = "00"
      document.getElementById("minutes").textContent = "00"
      document.getElementById("seconds").textContent = "00"
    }
  }

  updateCountdown()
  const countdownInterval = setInterval(updateCountdown, 1000)
}

// Fireworks Animation
function initFireworks() {
  const canvas = document.getElementById("fireworks-canvas")
  const ctx = canvas.getContext("2d")

  // Set canvas dimensions
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Make canvas non-blocking
  canvas.style.pointerEvents = "none"
  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.zIndex = "1000"

  // Firework class
  class Firework {
    constructor(x, y, targetX, targetY, color) {
      this.x = x
      this.y = y
      this.targetX = targetX
      this.targetY = targetY
      this.color = color
      this.speed = 2
      this.angle = Math.atan2(targetY - y, targetX - x)
      this.velocity = {
        x: Math.cos(this.angle) * this.speed,
        y: Math.sin(this.angle) * this.speed,
      }
      this.particles = []
      this.alive = true
    }

    update() {
      this.x += this.velocity.x
      this.y += this.velocity.y

      // Check if firework reached target
      const distanceToTarget = Math.sqrt(Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2))

      if (distanceToTarget < 5) {
        this.explode()
        this.alive = false
      }
    }

    explode() {
      const particleCount = 100
      for (let i = 0; i < particleCount; i++) {
        const particle = new Particle(this.x, this.y, this.color)
        this.particles.push(particle)
      }
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()

      // Draw particles
      for (let i = 0; i < this.particles.length; i++) {
        if (this.particles[i].alive) {
          this.particles[i].update()
          this.particles[i].draw()
        } else {
          this.particles.splice(i, 1)
          i--
        }
      }
    }
  }

  // Particle class
  class Particle {
    constructor(x, y, color) {
      this.x = x
      this.y = y
      this.color = color
      this.size = Math.random() * 3 + 1
      this.speed = Math.random() * 3 + 0.5
      this.angle = Math.random() * Math.PI * 2
      this.velocity = {
        x: Math.cos(this.angle) * this.speed,
        y: Math.sin(this.angle) * this.speed,
      }
      this.alpha = 1
      this.decay = Math.random() * 0.03 + 0.01
      this.alive = true
    }

    update() {
      this.x += this.velocity.x
      this.y += this.velocity.y
      this.velocity.y += 0.05 // gravity
      this.alpha -= this.decay

      if (this.alpha <= 0) {
        this.alive = false
      }
    }

    draw() {
      ctx.globalAlpha = this.alpha
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()
      ctx.globalAlpha = 1
    }
  }

  // Array to store fireworks
  const fireworks = []

  // Colors for fireworks
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffa500", "#ff5722"]

  // Create fireworks
  function createFirework() {
    const x = Math.random() * canvas.width
    const y = canvas.height
    const targetX = Math.random() * canvas.width
    const targetY = Math.random() * (canvas.height * 0.9)
    const color = colors[Math.floor(Math.random() * colors.length)]

    fireworks.push(new Firework(x, y, targetX, targetY, color))
  }

  // Animation loop
  function animate() {
    // Clear canvas with very transparent black for subtle trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw fireworks
    for (let i = 0; i < fireworks.length; i++) {
      if (fireworks[i].alive) {
        fireworks[i].update()
        fireworks[i].draw()
      } else if (fireworks[i].particles.length === 0) {
        fireworks.splice(i, 1)
        i--
      }
    }

    requestAnimationFrame(animate)
  }

  // Start animation
  animate()

  // Create 20 fireworks per second for 5 seconds
  let fireworksCreated = 0
  const totalFireworks = 100 * 3 // 20 per second for 5 seconds

  const fireworkInterval = setInterval(() => {
    for (let i = 0; i < 2; i++) {
      // Create 2 fireworks every 100ms (20 per second)
      createFirework()
      fireworksCreated++

      if (fireworksCreated >= totalFireworks) {
        clearInterval(fireworkInterval)

        // Fade out canvas after all fireworks are done
        setTimeout(() => {
          let opacity = 1
          const fadeInterval = setInterval(() => {
            opacity -= 0.1
            canvas.style.opacity = opacity
            if (opacity <= 0) {
              clearInterval(fadeInterval)
              canvas.style.display = "none"
            }
          }, 100)
        }, 2000)

        break
      }
    }
  }, 100)

  // Resize canvas when window is resized
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// Gallery and Lightbox
function initGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item")
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  const lightboxCaption = document.getElementById("lightbox-caption")
  const closeLightbox = document.querySelector(".close-lightbox")

  // For demo purposes, replace placeholder images with actual images
  // In a real project, you would use actual image paths
  // In a real project, you would use actual image paths
  // galleryItems.forEach((item, index) => {
  //   const img = item.querySelector("img")
  //   // Use placeholder images for demo
  //   img.src = `https://source.unsplash.com/random/600x400?ramayana,${index}`
  //   item.dataset.src = `https://source.unsplash.com/random/1200x800?ramayana,${index}`
  // })

  // First image is already set in HTML, update the rest for demo purposes
  // In a real project, you would use actual image paths
  for (let i = 1; i < galleryItems.length; i++) {
    const img = galleryItems[i].querySelector("img")
    // Use placeholder images for demo
    img.src = `https://source.unsplash.com/random/600x400?ramayana,${i}`
    galleryItems[i].dataset.src = `https://source.unsplash.com/random/1200x800?ramayana,${i}`
  }

  // Implement lazy loading
  const lazyLoadImages = () => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target.querySelector("img")
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute("data-src")
          }
          observer.unobserve(entry.target)
        }
      })
    }, options)

    galleryItems.forEach((item) => {
      observer.observe(item)
    })
  }

  lazyLoadImages()

  // Open lightbox when clicking on gallery item
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imgSrc = item.dataset.src
      const caption = item.querySelector(".gallery-caption").textContent

      lightboxImg.src = imgSrc
      lightboxCaption.textContent = caption
      lightbox.style.display = "block"
    })
  })

  // Close lightbox
  closeLightbox.addEventListener("click", () => {
    lightbox.style.display = "none"
  })

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none"
    }
  })
}

// Feature Animations
function initFeatureAnimations() {
  const featureItems = document.querySelectorAll(".feature-item")

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add delay based on index
        setTimeout(() => {
          entry.target.classList.add("visible")
        }, index * 200)
        observer.unobserve(entry.target)
      }
    })
  }, options)

  featureItems.forEach((item) => {
    observer.observe(item)
  })
}

// Audio Controls
function initAudioControls() {
  const audioToggle = document.getElementById("audio-toggle")
  const audioIcon = document.getElementById("audio-icon")
  const backgroundMusic = document.getElementById("background-music")

  // Set initial state
  let isPlaying = false

  // Theme song is already set in the HTML

  audioToggle.addEventListener("click", () => {
    if (isPlaying) {
      backgroundMusic.pause()
      audioIcon.className = "fas fa-volume-mute"
    } else {
      backgroundMusic.play()
      audioIcon.className = "fas fa-volume-up"
    }

    isPlaying = !isPlaying
  })
}

