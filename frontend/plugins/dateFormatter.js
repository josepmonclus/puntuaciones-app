export default defineNuxtPlugin((nuxtApp) => {
    // Función para formatear fechas
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
  
    // Inyecta la función en el contexto de la aplicación
    nuxtApp.provide('formatDate', formatDate);
  });