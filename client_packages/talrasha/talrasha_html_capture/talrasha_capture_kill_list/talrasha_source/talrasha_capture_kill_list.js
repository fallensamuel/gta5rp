const killList = new Vue({
  el: '#killList',
  data: {
   list: [],
   maxCount: 5,
   hash: 0,
  },
  methods: {
    push(data) {
      let res = JSON.parse(data)

      if(this.list.length < this.maxCount) {
        this.list.push({
          killer: res.killer,
          color: res.color,
          player: res.player,
          colorTwo: res.colorTwo,
          hash: ++this.hash,
        })
      }
    },
    hide() {
      this.list = []
    }
  }
})

/*Тест лог - {killer: Test Test, player: Test Test, hash: 1 } */