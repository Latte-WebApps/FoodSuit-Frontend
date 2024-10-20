<script>
import AttendanceService from "../services/attendance.service";

export default {
  name: "employee-payments",
  data() {
    return {
      attendances: [],
      hourlyRate: 0,
      error: null,
    };
  },
  mounted() {
    this.loadAttendances();
  },
  methods: {
    loadAttendances() {
      AttendanceService.getAll()
          .then((response) => {
            this.attendances = response.data;
          })
          .catch((error) => {
            console.error("Error loading attendances:", error);
          });
    },

    calculateTotalHours(startHour, endHour) {
      // Validar si los registros son correctos
      if (!startHour || !endHour) {
        this.error = "Error: los registros de horas están incompletos.";
        return "N/A";
      }

      try {
        // Crear objetos Date para calcular la diferencia
        const startTime = new Date(`1970-01-01T${startHour}:00`);
        const endTime = new Date(`1970-01-01T${endHour}:00`);

        if (isNaN(startTime) || isNaN(endTime)) {
          throw new Error("Hora inválida");
        }

        const diffInMs = endTime - startTime;
        const diffInHours = diffInMs / (1000 * 60 * 60);

        // Si el cálculo es correcto, reiniciar el error y devolver las horas
        this.error = null;
        return diffInHours.toFixed(2);
      } catch (e) {
        this.error = "Error: los registros de horas son incorrectos.";
        return "N/A";
      }
    },

    calculatePayment(startHour, endHour) {
      const totalHours = this.calculateTotalHours(startHour, endHour);
      if (totalHours === "N/A") {
        return 0;
      }
      return totalHours * this.hourlyRate;
    },
  },
  filters: {
    // Filtro para mostrar el valor como moneda
    currency(value) {
      return `${value.toFixed(2)}`;
    }
  }
};
</script>
<template>
  <div class="flex flex-column justify-content-center items-center gap-4">

    <h2>Payments Calculation</h2>
    <div class="flex flex-row w-auto">
      <label for="hourlyRate">Payment per hour: </label>
      <pv-input-number
          v-model="hourlyRate"
          inputId="hourlyRate"
          placeholder="Enter hourly rate"
          fluid/>
    </div>

    <!-- Tabla para mostrar los cálculos -->
    <table class="attendance-table">
      <thead>
      <tr>
        <th>Employee</th>
        <th>Total Hours Worked</th>
        <th>Payment ({{ hourlyRate | currency }})</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="attendance in attendances" :key="attendance.id">
        <td>{{ attendance.name }}</td>
        <td>{{ calculateTotalHours(attendance.start[0].hour, attendance.end[0].hour) }}</td>
        <td>{{ calculatePayment(attendance.start[0].hour, attendance.end[0].hour) | currency }}</td>
      </tr>
      </tbody>
    </table>

    <div @if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>


<style scoped>
.attendance-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.attendance-table th, .attendance-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.attendance-table th {
  background-color: #f5f5f5;
}

.error-message {
  color: red;
  font-weight: bold;
}
</style>