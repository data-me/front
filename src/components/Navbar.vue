<template>
    <div id="nav">
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">
            <img id="DataMe-brand" src="https://data-me.github.io/img/branding/DataMe-brand.png">
            </b-navbar-brand>


        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item href="/applications.html">Applications</b-nav-item>
            <b-nav-item href="/explore.html">Offers</b-nav-item>
            <!-- <b-nav-item href="/companies.html">Companies</b-nav-item> -->
            <!-- <b-nav-item href="#">Pricing</b-nav-item> -->
            <b-nav-item href="/mail.html">Mail</b-nav-item>
            <!--<div v-if="user_type === 'ds'">-->
            <b-nav-item v-show="isDataScientist" href="/my_cv.html">Curriculum</b-nav-item>

            <b-nav-item href="/login.html">Log In</b-nav-item>
            <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            </b-nav-item-dropdown> -->
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>
<script>
export default {
  name: 'Navbar',
  props:{

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
      isCompany: null,
      isDataScientist: null
    }
  }, mounted: function () {
    var token = 'JWT ' + this.$cookies.get('token')

    if (this.$cookies.get('user_type') == 'com') {
      this.isCompany = true
    } else {
      this.isDataScientist = true
    }

    this.$http.get('http://localhost:8000/api/v1/apply',{ headers:
      { Authorization: token }
      }).then((result) => {
        this.items = result.data
      })
  }, created:function(){
      Auth.logout();
      console.log(Auth.getLogin());
      this.$router.go('/login');
    }
}
</script>
<style>
#DataMe-brand {
    height: 35px;
    width: auto;
}
</style>
