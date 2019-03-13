import Api from "@/api/home";
import store from '@/store/store'
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
   var date = new Date(date);
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
export function accSub(arg1, arg2) { 
    var r1, r2, m, n; 
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 } 
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 } 
    m = Math.pow(10, Math.max(r1, r2)); 
    n = (r1 >= r2) ? r1 : r2; 
    return ((arg1 * m - arg2 * m) / m).toFixed(n); 
  }
  export function accAdd(arg1, arg2) { 
    var r1, r2, m, n; 
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 } 
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 } 
    m = Math.pow(10, Math.max(r1, r2)); 
    n = (r1 >= r2) ? r1 : r2; 
    return ((arg1 * m + arg2 * m) / m).toFixed(n); 
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

export function updateUserInfo(){
      let that=this
      wx.login({
        success: function (res) {
          if (res.code) {
            Api.getCode(res.code).then(function(memberRes){
              if(memberRes.code!=500){
                store.commit("storeUserInfo",memberRes.memberDo)         
              }
            })
          }
        }
    }) 
  }

export default {
  formatNumber,
  formatTime,
  ToastShow,
  random_No,
  accSub,
  accAdd,
  updateUserInfo
}
