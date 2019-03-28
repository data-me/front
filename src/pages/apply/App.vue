<template>
  <div id="app">

        </div>

      <!-- Modal Pop up -->
      <div>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="title"
          label="Title:"
          label-for="title"
        >
          <b-form-input
            id="title"
            type="text"
            v-model="form.title"
            required />
        </b-form-group>

        <b-form-group id="description" label="Description:" label-for="description">
          <b-form-input
            id="description"
            type="text"
            v-model="form.description"
            required/>
        </b-form-group>
      </div>

  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue'


export default {
  name: 'app',
  components: {
    Navbar
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
