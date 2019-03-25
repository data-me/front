<template>
  <div id="app">
    <Navbar/>
        <br/>
          <div id="offers" v-for="item in items">
          <b-card :title="item.title" :sub-title="item.price_offered + '€' ">
            <b-card-text>
              {{item.description}}
            </b-card-text>
            <a href="#" class="card-link">Apply</a>
            <b-link href="#" class="card-link">List of applicants</b-link>
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
    Footer
  },
  data () {
    return {
      items: [],
    }
  }, mounted: function () {
    this.$http.get('http://localhost:8000/api/v1/offer/').then((result) => {
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

#offers {
  margin: 2em;
}

html {
  background-color: #ffffff;
}

</style>
