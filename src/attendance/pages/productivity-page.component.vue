
<script>
import EmployeePayments from "../components/employee-payments.component.vue";
import AttendanceService from "../services/attendance.service.js";
import ProductivityChart from "../components/productivity-chart.component.vue";

export default {
  components: {ProductivityChart, EmployeePayments},
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
  <div>
    <!-- Componente para calcular los pagos -->
    <employee-payments :attendances="attendances"/>
    <ProductivityChart/>

  </div>
</template>
