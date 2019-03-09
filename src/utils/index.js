function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function ToastShow(title,ico) {
    wx.showToast({
      title: title,
      icon: ico,
      duration: 2000
    })
}

export function random_No(J){
  var random_no ='';
  for(var i = 0; i < J; i++){
      random_no += Math.floor(Math.random()*10)
  }
  random_no = new Date().getTime() + random_no
  return random_no;
}

export default {
  formatNumber,
  formatTime,
  ToastShow,
  random_No
}
