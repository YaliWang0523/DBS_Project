<template lang="jade">
	div
		common-navigation
		login-modal
		router-view
		common-footer
</template>

<script>
import CommonFooter from '@/components/Footer'
import CommonNavigation from '@/components/Navigation'
import LoginModal from '@/components/Modal/Login/LoginModal'

export default {
  components: { CommonFooter, CommonNavigation, LoginModal },
  name: 'app'
}
</script>

<style lang="scss" src="./assets/bootstrap/bootstrap.scss"/>
