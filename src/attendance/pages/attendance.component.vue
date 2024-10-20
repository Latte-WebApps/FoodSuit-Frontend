<script>
import AttendanceManagement from "../components/attendance-management.component.vue";
import EmployeePayments from "../components/employee-payments.vue";

export default {
  name: "attendance",
  components: {EmployeePayments, AttendanceManagement}
}
</script>

<template>
 <attendance-management></attendance-management>
  <employee-payments> </employee-payments>
</template>

<style scoped>

</style>