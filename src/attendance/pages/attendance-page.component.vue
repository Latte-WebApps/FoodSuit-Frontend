<script>
import AttendanceManagement from "../components/attendance-management.component.vue";
import AttendanceService from "../services/attendance.service.js";

export default {
  name: "attendance-page",
  components: {AttendanceManagement},
  data() {
    return {
      attendances: []  // Aquí almacenaremos las asistencias
    };
  },
  mounted() {
    this.loadAttendances();  // Cargar las asistencias cuando el componente padre se monta
  },
  methods: {
    loadAttendances() {
      // Llama al servicio de asistencia para obtener los datos actualizados
      AttendanceService.getAll()
          .then(response => {
            this.attendances = response.data;
          })
          .catch(error => {
            console.error("Error al cargar las asistencias:", error);
          });
    }
  }
}
</script>

<template>
  <AttendanceManagement @attendance-updated="loadAttendances"></AttendanceManagement>

</template>

<style scoped>

</style>