<template>
  <div>
    <!-- Componente para gestionar las asistencias -->
    <attendance-management @attendance-updated="loadAttendances"></attendance-management>

    <!-- Componente para calcular los pagos -->
    <employee-payments :attendances="attendances"></employee-payments>
  </div>
</template>

<script>
import AttendanceManagement from "./attendance-management.component.vue";
import EmployeePayments from "./employee-payments.vue";
import AttendanceService from "../services/attendance.service"; // Ruta del servicio

export default {
  components: {
    AttendanceManagement,
    EmployeePayments
  },
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
};
</script>
