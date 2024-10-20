<script>

export default {
  name: "employee-payments",
  props: {
    attendances: Array  // Recibe las asistencias como prop desde el componente padre
  },
  data() {
    return {
      hourlyRate: 0,  // Tarifa por hora ingresada por el usuario
      error: null  // Mensaje de error
    };
  },
  computed: {
    // Procesar las asistencias para calcular el total de horas y el pago
    processedAttendances() {
      if (!Array.isArray(this.attendances)) return [];  // Verificar que 'attendances' sea un array válido

      return this.attendances.map(attendance => {
        const totalHours = this.calculateTotalHours(attendance);
        return {
          ...attendance,
          totalHours,
          payment: totalHours * this.hourlyRate
        };
      });
    },
  },
  methods: {
    calculateTotalHours(attendance) {
      const { start, end, 'date-start': dateStart, 'date-end': dateEnd } = attendance;

      // Validación básica de campos
      if (!start[0].hour || !end[0].hour || !dateStart || !dateEnd) {
        this.error = "Error: los registros de horas o fechas están incompletos.";
        return 0;
      }

      try {
        // Crear objetos de fecha para las horas y fechas de inicio y fin
        const startTime = new Date(`1970-01-01T${start[0].hour}:00`);
        const endTime = new Date(`1970-01-01T${end[0].hour}:00`);
        const startDate = new Date(dateStart);
        const endDate = new Date(dateEnd);

        // Validar que las fechas y horas sean correctas
        if (isNaN(startTime) || isNaN(endTime) || isNaN(startDate) || isNaN(endDate)) {
          throw new Error("Hora o fecha inválida");
        }

        // Calcular la diferencia de horas en un día
        const diffInMs = endTime - startTime;
        const hoursPerDay = diffInMs / (1000 * 60 * 60);  // Convertir ms a horas

        // Calcular la diferencia de días
        const diffDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;  // Incluir ambos días

        // Multiplicar horas por día por el número de días
        const totalHours = hoursPerDay * diffDays;

        this.error = null;  // Reiniciar el error si el cálculo fue exitoso
        return totalHours.toFixed(2);  // Devolver las horas trabajadas con 2 decimales
      } catch (e) {
        this.error = "Error: los registros de horas o fechas son incorrectos.";
        return 0;
      }
    }
  },
  filters: {
    currency(value) {
      return `${value.toFixed(2)}`;
    }
  }
};
</script>

<template>
  <div class="  flex flex-column align-items-center gap-4">
    <h2>Payments Calculation</h2>

    <!-- Entrada para la tarifa por hora -->
    <div class="flex flex-row w-4">
      <label for="hourlyRate">Payment per hour: </label>
      <pv-input-number
          v-model="hourlyRate"
          inputId="hourlyRate"
          placeholder="Enter hourly rate"
          min="0"
          fluid
      />
    </div>

    <!-- Tabla para mostrar los cálculos -->
    <table class="attendance-table">
      <thead>
      <tr>
        <th>Employee</th>
        <th>Date Start</th>
        <th>Date End</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Total Hours Worked</th>
        <th>Payment</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="attendance in processedAttendances" :key="attendance.id">
        <td>{{ attendance.name }}</td>
        <td>{{ attendance['date-start'] }}</td>
        <td>{{ attendance['date-end'] }}</td>
        <td>{{ attendance.start[0].hour }}</td>
        <td>{{ attendance.end[0].hour }}</td>
        <td>{{ attendance.totalHours }}</td>
        <td>{{ attendance.payment | currency }}</td>
      </tr>
      </tbody>
    </table>

    <!-- Mensaje de error si existe -->
    <div v-if="error" class="error-message">
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
