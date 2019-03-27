<template>
  <div id="app">
    <Navbar/>
        <div class="create-apply">
          <b-button id="create-apply" v-b-modal.modalxl variant="outline-primary" >Create new apply</b-button>
        </div>

          <div id="applies" v-for="item in items">
          <b-card :title="item.title" :sub-title="item.price_offered + '€' ">
            <b-card-text>
              {{item.description}}
            </b-card-text>
            <a href="#" class="card-link">Apply</a>
            <b-link href="#" class="card-link">List of applicants</b-link>
          </b-card>
        </div>

      <!-- Modal Pop up -->
      <div>
        <b-modal id="modalxl" hide-footer ref="newApply" size="xl" title="Create an apply">
          <b-form  @submit.prevent>
            <label for="title">Title</label>
            <b-input type="text" v-model="form.title" id="title" aria-describedby="titleHelpBlock" />
            <br/>
            <label for="description">Description</label>
            <b-input type="text" id="description" v-model="form.description" aria-describedby="descriptionHelpBlock" />
            <br/>
            <label for="price">Price offered</label>
            <b-input type="number" id="price" v-model="form.price_offered" aria-describedby="priceHelpBlock" />
            <b-form-text id="priceHelpBlock">
              Give your offer a price.
            </b-form-text>
            <br/>
         <b-button class="mt-2" variant="success" block @click="toggleModal">Create offer</b-button>
          </b-form>
        </b-modal>
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
        },
    }
  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('http://localhost:8000/api/v1/apply',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.items = result.data
      })
  }, methods: {


    },
     toggleModal() {
       var token = 'JWT ' + this.$cookies.get('token')
       const formData = new FormData();
       formData.append("title", this.form.title);
       formData.append("description", this.form.description);


       this.$http.post('http://localhost:8000/api/v1/offer/', formData,{ headers:
      { Authorization: token }
      }).then((result) => {
          alert("Successfully created new apply")
          location.reload()
      })

     }
  }
}

/*{
          'title': this.form.title,
          'description': this.form.description,
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
