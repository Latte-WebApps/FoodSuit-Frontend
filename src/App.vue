<template>
  <div class="app-container">
    <!-- Encabezado -->
    <header>
      <div class="header-title">
        <h1 class="title">FoodSuit</h1>
      </div>
      <nav class="navbar">
        <div class="nav-left">
          <router-link to="/" class="active-link">Home</router-link>
          <router-link to="/finance">Finance</router-link>
          <router-link to="/employees">Employees</router-link>
          <router-link to="/inventory">Inventory</router-link>
        </div>
        <div class="nav-right">
          <span class="user">Hello, User</span>
        </div>
      </nav>
    </header>

    <!-- Contenido principal -->
    <main class="content">
      <!-- Resumen de Cuentas -->
      <section class="accounts-section">
        <h2 class="section-title">Accounts</h2>
        <div class="account-item green">Table 1 - $180</div>
        <div class="account-item green">Table 4 - $110</div>
        <div class="account-item red">Bought: 30 Tomatoes - $30</div>
        <div class="account-item green">Table 3 - $78</div>
        <div class="account-item green">Table 2 - $60</div>
        <div class="account-item red">Bought: 20kg of meat - $180</div>
        <div class="account-item green">Table 5 - $80</div>
      </section>

      <!-- Sección de Empleados y Productos Escasos -->
      <section class="employees-products-section">
        <div class="employees">
          <h3>Most Productive Employees</h3>
          <div class="employee-item">Tina Martinez</div>
          <div class="employee-item">Juan Flores</div>
        </div>

        <div class="products">
          <h3>Most Scarce Products</h3>
          <div class="product-item">Carrot - 2</div>
          <div class="product-item">Tempeh - 4</div>
          <div class="product-item">Lemon - 5</div>
          <div class="product-item">Spinach - 3</div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* Estructura general */
.app-container {
  background-color: #ffffff;
  min-height: 100vh;
  color: #333;
  font-family: Arial, sans-serif;
}

/* Título separado del navbar */
.header-title {
  display: flex;
  justify-content: left;
  padding: 20px;
  background-color: #3D4C51; /* Fondo oscuro */
}

.title {
  font-size: 2rem;
  color: #ffffff;
}

/* Barra de navegación */
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #3D4C51; /* Fondo oscuro */
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.navbar a {
  color: #B5C3C7;  /* Color de los enlaces en la barra de navegación */
  text-decoration: none;
  font-weight: bold;
}

.active-link {
  color: #000000;
  font-weight: bolder;
}

.nav-right {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user {
  font-size: 1.2rem;
  color: #ffffff;
}

/* Sección de cuentas */
.accounts-section {
  width: 45%;
  padding: 20px;
}

.account-item {
  padding: 10px;
  margin: 10px 0;
  text-align: center;
  font-weight: bold;
  border-radius: 4px;
}

.green {
  background-color: #d4edda;
  color: #155724;
}

.red {
  background-color: #f8d7da;
  color: #721c24;
}

/* Sección de empleados y productos */
.employees-products-section {
  display: flex;
  justify-content: space-between;
  width: 90%;
  padding: 20px;
}

.employees, .products {
  width: 45%;
}

.employee-item, .product-item {
  background-color: #f1f3f5;
  padding: 10px;
  margin: 10px 0;
  text-align: center;
  border-radius: 4px;
}
</style>
