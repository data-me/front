<template>
  <div id="app">
    <Navbar/>
        <div class="create-message">
          <b-button id="create-message" v-b-modal.modalxl variant="outline-primary" >Create new message</b-button>
        </div>

        <h1>Received Messages</h1>
        <div id="messages" v-for="item in items">
          <b-card :title="item.title" >
            <b-card-text>{{item.body}}</b-card-text>
          </b-card>
        </div>

      <div>
        <b-modal id="modalxl" hide-footer ref="newMessage" size="xl" title="Create a message">
          <b-form  @submit.prevent>
            <label for="title">Title</label>
            <b-input type="text" v-model="form.title" id="title" aria-describedby="titleHelpBlock" />
            <b-form-text id="titleHelpBlock">
              The main subject of your message, please keep it short.
            </b-form-text>
            <br/>
            <label for="body">Body</label>
            <b-input type="text" id="body" v-model="form.body" aria-describedby="bodyHelpBlock" />
            <b-form-text id="bodyHelpBlock">
              The body of your message.
            </b-form-text>
            <br/>
            <label for="receiverId">Receiver</label>
            <select v-model="selected">
                <option v-for="opt in options">
                {{ opt.name }}
                </option>
            </select>
            <!--<b-input type="text" id="receiverId" v-model="form.receiver" aria-describedby="receiverHelpBlock" />-->
            <b-form-text id="receiverHelpBlock">
              The receiver of your message.
            </b-form-text>
            <br/>
             <b-button class="mt-2" variant="success" block @click="toggleModal">Create message</b-button>
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
    Navbar,
  },
  data () {
    return {
      items: [],
      selected: '', //usuario seleccionado
      options:'', //lista de usuarios
      form: {
          title: '',
          body: '',
          receiverId: null,
        }
    }
  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')
    this.$http.get('http://localhost:8000/api/v1/message',{ headers: 
      { Authorization: token }
      }).then((result) => {
        this.items = result.data
      })
    
    this.$http.get('http://localhost:8000/api/v1/users',{ headers: 
      { Authorization: token }
      }).then((result) => {
        this.options = result.data
      })
      
  }, methods: {
    createMessage: function () {
      
    },
     toggleModal() {
       var token = 'JWT ' + this.$cookies.get('token')
       const formData = new FormData();
       formData.append("title", this.form.title);
       formData.append("body", this.form.body);
       formData.append("receiverId", this.form.receiver);
      
       this.$http.post('http://localhost:8000/api/v1/message', formData,{ headers: 
      { Authorization: token }
      }).then((result) => {
          alert("Message created successfully!")
          location.reload()
      })
    }
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

.create-message {
  text-align: right;
}
#create-message {
  margin-top: 2em;
  margin-right: 2em;
}


html {
  background-color: #ffffff;
}

</style>
