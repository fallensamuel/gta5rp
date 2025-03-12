const modal = new Vue({
 el: '#modal',
 data: {
   id: 0,
   name: '',
   info: 'бизнесе',
   isShow: false,
 },
 methods: {
  push(data) {
    this.isShow = true
    let res = JSON.parse(data)
    this.id = res.id + 1
    this.name = res.title
    if(res.zone) this.info = 'бизнесе'
    this.info = 'предприятие'
  },
  hide() {
    this.isShow = false
  }
 }
})