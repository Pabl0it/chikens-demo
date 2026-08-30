// Configuración global para Chart.js con la estética de la nave
Chart.defaults.color = '#86efac';
Chart.defaults.font.family = 'Special Elite';

// Gráfico 1: Línea de Producción
const ctx1 = document.getElementById('chartProduccion').getContext('2d');
new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['Día 1', 'Día 20', 'Día 40', 'Día 60', 'Día 80', 'Día 100'],
        datasets: [{
            label: 'Extracción (kT)',
            data: [15, 38, 22, 45, 30, 49],
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            borderWidth: 3,
            fill: true,
            tension: 0.1
        }]
    },
    options: { 
        responsive: true, 
        maintainAspectRatio: false,
        scales: {
            grid: { color: '#14301a' }
        }
    }
});

// Gráfico 2: Temperatura por Sector
const ctx2 = document.getElementById('chartTemperatura').getContext('2d');
new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Sector Alfa', 'Sector Beta', 'Sector Gamma', 'Sector Delta'],
        datasets: [{
            label: 'Temperatura Promedio (°C)',
            data: [540, 610, 490, 680],
            backgroundColor: ['#16a34a', '#ca8a04', '#0284c7', '#dc2626'],
            borderColor: '#000000',
            borderWidth: 2
        }]
    },
    options: { 
        responsive: true, 
        maintainAspectRatio: false 
    }
});