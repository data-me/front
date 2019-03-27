<template>

  <div id="app">
    <Navbar/>
        
  <h1><span></span>My Curriculum</h1>
          <div id="cv" v-for="item in items">
          <b-card :title="item.name" :sub-title="item.entity  ">
            <b-card-text>{{item.description}}</b-card-text>
            <b-card-text>{{item.date_start | formatDate}} - {{item.date_finish}}</b-card-text>
          </b-card>
        </div>

      <!--   <div>
          <b-card-group deck>
            <b-card
              header="featured"
              header-tag="header"
              footer="Card Footer"
              footer-tag="footer"
              title="Title"
            >
              <b-card-text>Header and footers using props.</b-card-text>
              <b-button href="#" variant="primary">Go somewhere</b-button>
            </b-card>

            <b-card title="Title" header-tag="header" footer-tag="footer">
              <h6 slot="header" class="mb-0">Header Slot</h6>
              <b-card-text>Header and footers using slots.</b-card-text>
              <b-button href="#" variant="primary">Go somewhere</b-button>
              <em slot="footer">Footer Slot</em>
            </b-card>
          </b-card-group>
        </div> -->

      

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
    }
  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('http://localhost:8000/api/v1/cv',{ headers: 
      { Authorization: token }
      }).then((result) => {
        this.items = result.data
      })
  }
}





/*{
          'title': this.form.title,
          'description': this.form.description,
          'price_offered': this.form.price_offered,
          'currency': '0',
          'limit_time': '2019,12,12,10,40,0,0'
      },{ headers: {
       'Content-Type': 'multipart/form-data'
      }*/
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

.create-offer {
  text-align: right;
}

#create-offer {
  margin-top: 2em;
  margin-right: 2em;
}

html {
  background-color: #ffffff;
}

</style>
