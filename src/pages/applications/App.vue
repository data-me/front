<template>
  <div id="app">
    <Navbar/>

          <div id="applications" v-for="item in items">
          <b-card :title="item.title" :sub-title="item.status">
            <b-card-text>
              {{item.description}}
            </b-card-text>
            <div v-if="user_type === 'com'">
            <b-link href="#" @click="senderId(item.DS_User_id)" class="card-link">Data Scientist</b-link>
            </div>

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
    Navbar
  },
  data () {
    return {
      items: [],
      form: {
          title: '',
          description: '',
          status: '',
          date: null
        },
        user_type: this.$cookies.get('user_type')
    }
  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('http://localhost:8000/api/v1/apply',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.items = result.data
      })
  }, methods: {
    senderId: function(id){
      var x = `ds_profile?ds_id=${id}`

      window.location.href = x


    },
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

#applications {
  margin: 2em;
}

html {
  background-color: #ffffff;
}

</style>
