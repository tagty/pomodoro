const pomodoroGoal = 25 * 60
const restGoal = 5 * 60
var goal = pomodoroGoal
var count = 0
var counting = false
var timerId

var formatTime = function () {
  timeSecAll = goal - count++
  timeSec = timeSecAll % 60
  timeMin = (timeSecAll - timeSec) / 60
  return zeroPadding(timeMin) + ":" + zeroPadding(timeSec)
}
var zeroPadding = function (num) { return ("00" + num).slice(-2) }
function countup() {
  var time = formatTime()
  displayNumber(time)
  timerId = setTimeout(function () { countup() }, 1000)
  if (goal < count) {
    clearTimeout(timerId)
    counting = false
    alert("Finish!")
  }
}
var displayNumber = function (time) {
  label = document.createElement("label")
  label.innerHTML = time
  timer = document.getElementById("timer")
  while (timer.firstChild) { timer.removeChild(timer.firstChild) }
  timer.appendChild(label)
  document.title = time
}
var changeFavicon = function (status) {
  var icon = document.querySelector("link[rel='icon")
  if (status == "running") {
    icon.href = "assets/images/favicon_running.png"
  } else if (status == "stop") {
    icon.href = "assets/images/favicon.png"
  }
}
function start() {
  if (!counting) {
    changeFavicon("running")
    counting = true
    countup()
  }
}
function stop() {
  changeFavicon("stop")
  clearTimeout(timerId)
  counting = false
}
var reset = function () {
  changeFavicon("stop")
  count = 0
  displayNumber(formatTime())
}
var resetTimer = function (resetType) {
  changeFavicon("stop")
  if (resetType == "pomodoro") {
    goal = pomodoroGoal
  } else if (resetType == "rest") {
    goal = restGoal
  }
  clearTimeout(timerId)
  counting = false
  count = 0
  displayNumber(formatTime())
}
displayNumber(formatTime())
