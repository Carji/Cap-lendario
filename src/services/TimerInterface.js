export const timerInterface = {
    setInterval:(handler, interval) => {window.setInterval(handler, interval)}, 
    clearInterval:(intervalID) => {window.clearInterval(intervalID)}
}