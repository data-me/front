<template>
  <div id="app">
    <Navbar/>
        <h1>Received Messages</h1>
        <div id="messages" v-for="item in items">
          <b-card :title="item.title" >
            <b-card-text>{{item.body}}</b-card-text>
          </b-card>
        </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'

export default {
  name: 'app',
  components: {
    Navbar,
  },
  data () {
    return {
      items: [],
    }
  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('http://localhost:8000/api/v1/message',{ headers: 
      { Authorization: token }
      }).then((result) => {
        this.items = result.data
      })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
}

#messages {
  margin: 2em;
}

html {
  background-color: #ffffff;
}

</style>
