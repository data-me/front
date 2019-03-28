<template>
  <div id="app">
    <Navbar/>
        <!-- Search bar -->
        <div>
          <b-form @submit="onSubmit">
            <input v-model="form.search" placeholder="Look offer by title or description">
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        </div>
        <!-- ////// -->
        <!-- Create an offer -->
        <div class="create-offer">
          <b-button id="create-offer" v-b-modal.modalxl variant="outline-primary"  >Create new offer</b-button>
        </div>

          <div id="offers" v-for="item in items">
          <b-card :title="item.title" :sub-title="item.price_offered + '€' ">
            <b-card-text>
              {{item.description}}
            </b-card-text>
            <b-link href="#" v-if= "item.finished == false" class="card-link" v-b-modal.createApply variant="outline-primary" @click="saveId(item.id)">Apply</b-link>
            <b-link href="#" class="card-link">List of applicants</b-link>
          </b-card>
        </div>
      <!-- ////// -->
      <!-- Modal Pop up -->
      <div>
        <b-modal id="modalxl" hide-footer ref="newOffer" size="xl" title="Create an offer">
          <b-form  @submit.prevent>
            <label for="title">Title</label>
            <b-input type="text" v-model="form.title" id="title" aria-describedby="titleHelpBlock" />
            <b-form-text id="titleHelpBlock">
              The main title for your offer, please keep it short. 
            </b-form-text>
            <br/>
            <label for="description">Description</label>
            <b-input type="text" id="description" v-model="form.description" aria-describedby="descriptionHelpBlock" />
            <b-form-text id="descriptionHelpBlock">
              The description for your offer, here you can explain everything.
            </b-form-text>
            <br/>
            <label for="price">Price offered</label>
            <b-input type="number" id="price" v-model="form.price_offered" aria-describedby="priceHelpBlock" />
            <b-form-text id="priceHelpBlock">
              Give your offer a price.
            </b-form-text>
            <br/>
            <label for="currency">Currency</label>
             <b-form-select id="currency" :options="currencys" required v-model="form.currency" />
             <br/>
             <br/>
             <label for="files">Files</label>
            <b-input type="text" id="files" v-model="form.files" aria-describedby="descriptionHelpBlock" />
            <b-form-text id="descriptionHelpBlock">
              The files for your offer, write your URLs.
            </b-form-text>
             <br/>
             <label for="contract">Contract</label>
            <b-input type="text" id="contract" v-model="form.contract" aria-describedby="descriptionHelpBlock" />
            <b-form-text id="descriptionHelpBlock">
              Terms and conditions of your contract
            </b-form-text>
             <br/>

             <b-button class="mt-2" variant="success" block @click="toggleModal">Create offer</b-button>
          </b-form>
        </b-modal>
      </div>


            <!-- Modal Pop up CreateApply -->
      <div>
        <b-modal id="createApply" hide-footer ref="newApply" size="xl" title="Create an apply">
          <b-form  @submit.prevent>
            <label for="title">Title</label>
            <b-input type="text" v-model="formApply.title" id="title" aria-describedby="titleHelpBlock" />
            <b-form-text id="titleHelpBlock">
              The main title for your appy, please keep it short.
            </b-form-text>
            <br/>
            <label for="description">Description</label>
            <b-input type="text" id="description" v-model="formApply.description" aria-describedby="descriptionHelpBlock" />
            <b-form-text id="descriptionHelpBlock">
              The description for your apply, here you can explain everything.
            </b-form-text>
            <br/>
             <b-button class="mt-2" variant="success" block @click="toggleCreateApply">Create apply</b-button>
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
          price_offered: null,
          currency: null,
          files: '',
          contract: '',
        },
        currencys: [{ text: 'Select One', value: null }, 'Euros', 'Dollars', 'Pounds'],

        formApply: {
            title: '',
            description: '',
            offerId: null,
        },
        offerId: '',
        
    }
    
  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('http://localhost:8000/api/v1/offer',{ headers: 
      { Authorization: token }
      }).then((result) => {
        this.items = result.data
      })
  }, methods: {

      toggleCreateApply() {
       var token = 'JWT ' + this.$cookies.get('token')
       const formApply = new FormData();
       formApply.append("title", this.formApply.title);
       formApply.append("description", this.formApply.description);
       formApply.append("offerId", this.offerId);
       this.$http.post('http://localhost:8000/api/v1/apply', formApply,{ headers: 
      { Authorization: token }
      }).then((result) => {
          alert(result.data.message)
          location.reload()
      })

     },


    createOffer: function () {

    },
    saveId: function(idOffer){
    this.offerId = idOffer
    },
     toggleModal() {
       var token = 'JWT ' + this.$cookies.get('token')
       const formData = new FormData();
       formData.append("title", this.form.title);
       formData.append("description", this.form.description);
       formData.append("price_offered", this.form.price_offered);
       formData.append("currency", "0");
       formData.append("limit_time", "2019,12,12,10,40,0,0");
       formData.append("files", this.form.files);
       formData.append("contract", this.form.contract);
       
       
       this.$http.post('http://localhost:8000/api/v1/offer', formData,{ headers: 
      { Authorization: token }
      }).then((result) => {
          alert(result.data.message)
          location.reload()
      })

     },
      onSubmit(evt) {
        evt.preventDefault()
        var token = `JWT ${this.$cookies.get('token')}`
        this.$http.get(`http://127.0.0.1:8000/api/v1/offer?search=${this.form.search}`,{ headers:
          { Authorization: token }}).then((result) => {
            this.items = result.data
          })
      }
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
