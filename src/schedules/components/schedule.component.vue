<template>
  <div>
    <div class="schedule-container">
      <Card
          v-for="schedule in schedules"
          :key="schedule.id"
          class="schedule-card"
      >
        <template #header>
        </template>
        <div class="schedule-hours">
          <p>{{ schedule.name }} : {{ schedule.hours }}</p> <!-- Display Working Hours -->
        </div>
      </Card>
    </div>
  </div>
  <div>
    <div>
      <div class="mt-10 text-center">
        <button @click="showDialog = true" class="btn">Nuevo Horario</button>
      </div>

      <Dialog :show="showDialog"
              :cancel="cancel"
              :confirm="confirm"
              title="Crear Nuevo Horario"
              description="Ingresa la informacion" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      schedules: [
        { id: 1, name: "Tina Martinez", hours: "19:00 - 22:00" },
        { id: 2, name: "Juan Flores", hours: "8:00 - 12:00" },
        { id: 3, name: "Ana Gómez", hours: "8:00 - 12:00" },
        { id: 4, name: "Fernando Sánchez", hours: "13:00 - 17:00" },
        { id: 5, name: "Elena Torres", hours: "17:00 - 21:00" },
        { id: 6, name: "David Ruiz", hours: "8:00 - 12:00" },
        { id: 7, name: "Sofia Morales", hours: "17:00 - 21:00" }
      ]
    };
  },
  methods: {
    addSchedule() {
      // Logic to add a new schedule
      console.log("Add new schedule clicked");
      this.schedules.push({ id: this.schedules.length + 1, name: "New Employee", hours: "9:00 - 13:00" });
    }
  }
};
</script>

<style scoped>
.schedule-container {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Space between cards */
}

.schedule-card {
  background-color: #f5f5f5; /* Light background for cards */
  padding: 1rem;
  border-radius: 8px; /* Rounded corners */
}

.schedule-hours {
  font-size: 1.2rem; /* Adjust font size */
}
</style>