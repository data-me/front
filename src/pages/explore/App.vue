<template>
  <div id="app">
    <Navbar/>
        <!-- ////// -->
        <!-- Create an offer -->
        <div v-if="user_type === 'com'">
          <div class="create-offer">
            <b-button id="create-offer" v-b-modal.modalxl variant="outline-primary"  >Create new offer</b-button>
          </div>
        </div>
        <div v-else-if="user_type === 'ds'">
        <!-- Search bar -->
          <div id="search-group">
            <b-form @submit="onSubmit">
              <b-input-group prepend="Search" class="mt-3">
              <b-form-input v-on:keyup="onSubmit" id="search" v-model="form.search" placeholder="title or description"></b-form-input>
              </b-input-group>
            </b-form>
          </div>
        </div>
        <!-- ////// -->

        <!-- Show offers -->
        <div id="offers" v-for="(item, index) in items">
          <b-card no-body>
            <b-card-header header-tag="header" class="p-3" role="tab">
              <b-button block v-b-toggle="'accordion-' + index" variant="outline-primary">
                {{item.title}}
              </b-button>
            </b-card-header>
            <b-collapse :id="'accordion-'+index" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text><span class="font-weight-bold">Description: </span> {{item.description}}</b-card-text>
                <b-card-text><span class="font-weight-bold">Price offered: </span>{{item.price_offered + '€'}}</b-card-text>
                <b-card-text><span class="font-weight-bold">Creation date: </span>{{item.creation_date.slice(0,10)}}</b-card-text>
                <b-card-text><span class="font-weight-bold">Limit date: </span>{{item.limit_time.slice(0,10)}}</b-card-text>
                <b-card-text><span class="font-weight-bold">State: </span>{{ item.finished ? 'Finished' : 'Not finished' }}</b-card-text>
                <b-card-text><span class="font-weight-bold">Contract: {{item.contract}}</b-card-text>
                <b-card-text><span class="font-weight-bold">File: {{item.files}}</b-card-text>
                <b-card-text></b-card-text>
                <div v-if="user_type === 'ds'">
                  <b-link href="#" v-if= "item.finished == false" class="card-link" v-b-modal.createApply variant="outline-primary" @click="saveId(item.id)">Apply</b-link>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
      </div>
      <!-- ////// -->
      <!-- Modal Pop up -->
      <div>
        <b-modal id="modalxl" hide-footer ref="newOffer" size="xl" title="Create an offer">
          <b-form  @submit.prevent>
            <label for="title">Title</label>
            <b-input type="text" v-model="form.title" id="title" :state="form.title.length > 0"  :maxlength="80" aria-describedby="titleHelpBlock" />
            <b-form-text id="titleHelpBlock">
              The main title for your offer, max 80 characters.
            </b-form-text>
            <br/>
            <label for="description">Description</label>
            <b-input type="text" id="description" v-model="form.description" :state="form.description.length > 0" aria-describedby="descriptionHelpBlock" />
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
             <label for="limit_time">Limit date:</label>
            <b-input type="text" id="limit_time" v-model="form.limit_time" aria-describedby="descriptionHelpBlock" />
            <b-form-text id="descriptionHelpBlock">
              Limit date for being offered. (yyyy-MM-dd HH:mm)
            </b-form-text>
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

             <b-button class="mt-2" variant="success" block @click="createOffer">Create offer</b-button>
          </b-form>
        </b-modal>
      </div>


      <!-- Modal Pop up CreateApply -->
      <div>
        <b-modal id="createApply" hide-footer ref="newApply" size="xl" title="Create an apply">
          <b-form  @submit.prevent>
            <label for="title">Title</label>

            <b-input type="text" v-model="formApply.title" :state="tittleApply" id="title" aria-describedby="titleHelpBlock" />
            <b-form-text id="titleHelpBlock">
              The main title for your apply, please keep it short.
            </b-form-text>
             <b-form-invalid-feedback id="apply-tittle-feedback">
            Enter at least 5 letters
            </b-form-invalid-feedback>
            <br/>
            <label for="description">Description</label>
            <b-input type="text" id="description" v-model="formApply.description" :state="descriptionApply" aria-describedby="descriptionHelpBlock" />
            <b-form-text id="descriptionHelpBlock">
              The description for your apply, here you can explain everything.
            </b-form-text>
            <b-form-invalid-feedback id="apply-description-feedback">
            Enter at least 10 letters
            </b-form-invalid-feedback>
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
  computed:{
    tittleApply(){
        return this.formApply.title.length > 5 ? true : false
    },
     descriptionApply(){
        return this.formApply.description.length > 10 ? true : false
    }
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
        user_type: this.$cookies.get('user_type')

    }

  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('https://api-datame.herokuapp.com/api/v1/offer',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.items = result.data
      })
  }, methods: {

      toggleCreateApply() {
       var token = 'JWT ' + this.$cookies.get('token')
       const formApply = new FormData();
       if (this.formApply.title.length < 5 || this.formApply.description.length < 10){
        alert("Please correct the errors")

       } else{
       formApply.append("title", this.formApply.title);
       formApply.append("description", this.formApply.description);
       formApply.append("offerId", this.offerId);
       this.$http.post('https://api-datame.herokuapp.com/api/v1/apply', formApply,{ headers:
      { Authorization: token }
      }).then((result) => {
          alert(result.data.message)
          location.reload()
      })
      }

     },
    saveId: function(idOffer){
    this.offerId = idOffer
    },
     createOffer() {
       var token = 'JWT ' + this.$cookies.get('token')
       const formData = new FormData();
       formData.append("title", this.form.title);
       formData.append("description", this.form.description);
       formData.append("price_offered", this.form.price_offered);
       formData.append("currency", "0");
       formData.append("limit_time", this.form.limit_time);
       formData.append("files", this.form.files);
       formData.append("contract", this.form.contract);


      this.$http.post('https://api-datame.herokuapp.com/api/v1/offer', formData,{ headers:
      { Authorization: token }
      }).then((result) => {
          alert(result.data.message)
          location.reload()
      })

     },
      onSubmit() {
        let token = `JWT ${this.$cookies.get('token')}`
        this.$http.get(`https://api-datame.herokuapp.com/api/v1/offer?search=${this.form.search}`,{ headers:
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

#search-group{
  margin-left: 15%;
  margin-right: 15%;
}

</style>
