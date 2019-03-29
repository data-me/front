<template>
    <div id="nav">
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">
            <img id="DataMe-brand" src="..\assets\DataMe-brand.png">
            </b-navbar-brand>

        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item href="/applications">Applications</b-nav-item>
            <b-nav-item href="/explore">Explore</b-nav-item>
            <b-nav-item href="/companies">Companies</b-nav-item>
            <b-nav-item href="#">Pricing</b-nav-item>
            <b-nav-item href="/mail">Mail</b-nav-item>
            <b-nav-item href="/my_cv">My Curriculum</b-nav-item>
            <b-nav-item href="/login">Log In</b-nav-item>
            <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>
<script>
export default {
  name: 'Navbar',
  props:{

  }
}
</script>
<style>
#DataMe-brand {
    height: 35px;
    width: auto;
}
</style>
