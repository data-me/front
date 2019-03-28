<template lang="html">
    <div>
        <b-form id="item" @submit.prevent @submit="onSubmit" @reset="onReset">

            <b-col sm="3">
                <label for="name">Name:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input
                id="name"
                v-model="item.name"
                required
                placeholder="Name this record"
            ></b-form-input>
            </b-col>

            <b-col sm="3">
                <label for="entity">Entity:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input
                id="entity"
                v-model="item.entity"
                required
                placeholder="Organization or Entity"
            ></b-form-input>
            </b-col>

            <b-col sm="3">
                <label for="description">Desription:</label>
            </b-col>
            <b-col sm="9">
            <b-form-textarea
                id="description"
                v-model="item.description"
                placeholder="Enter a description..."
                rows="3"
                max-rows="6"
                required
            ></b-form-textarea>
            </b-col>

            <b-col sm="3">
                <label for="datestart">Start date:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input
                id="datestart"
                v-model="item.datestart"
                placeholder="yyyy-MM-dd HH:mm"
                required
            ></b-form-input>
            </b-col>

            <b-col sm="3">
                <label for="datefinish">Finalization date:</label>
            </b-col>
            <b-col sm="9">
            <b-form-input
                id="datefinish"
                v-model="item.datefinish"
                placeholder="yyyy-MM-dd HH:mm"
            ></b-form-input>
            </b-col>
            <br/>
            <b-col sm="9">
            <b-button type="submit" variant="primary">Save</b-button>
            </b-col>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'CreateItemSection',
    data(){
        return{
            item:{
                name: '',
                entity: '',
                description:'',
                datestart: '',
                datefinish: '',
            },

        }
    },
     props: ['secid'],
    methods: {
    onSubmit(evt) {
      evt.preventDefault()
        var token = 'JWT ' + this.$cookies.get('token')
      const baseURI = 'http://localhost:8000/api/v1/item'
      this.$http.post(baseURI, {
          'name':this.item.name,
          'secid':this.secid,
          'description': this.item.description,
          'entity': this.item.entity,
          'datestart': this.item.datestart,
          'datefinish': this.item.datefinish
      }, { headers: { Authorization: token }})
      .then((result) => {
        this.$router.replace({path:'/my_cv'})
      })
    }
  }
}
</script>
<style lang="css" scoped>

</style>

