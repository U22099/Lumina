function checkPWA(){
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true
  }
   return false
}

export default checkPWA