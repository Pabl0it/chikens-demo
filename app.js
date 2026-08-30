JavaScript
// Configuración global estética clínica de laboratorio (Azul / Blanco luminoso)
Chart.defaults.color = '#bae6fd';
Chart.defaults.font.family = 'Special Elite';

// Gráfico 1: Línea de Producción luminosa
const ctx1 = document.getElementById('chartProduccion').getContext('2d');
new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['Día 1', 'Día 20', 'Día 40', 'Día 60', 'Día 80', 'Día 100'],
        datasets: [{
            label: 'Extracción (kT)',
            data: [15, 38, 22, 45, 30, 49],
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.25)',
            borderWidth: 3,
            fill: true,
            tension: 0.2
        }]
    },
    options: { 
        responsive: true, 
        maintainAspectRatio: false,
        animation: {
            duration: 2000,
            easing: 'easeOutQuart'
        },
        scales: {
            grid: { color: '#1e293b' },
            ticks: { color: '#bae6fd' }
        }
    }
});

// Gráfico 2: Temperatura por Sector con paleta azul, blanca y celeste
const ctx2 = document.getElementById('chartTemperatura').getContext('2d');
new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Sector Alfa', 'Sector Beta', 'Sector Gamma', 'Sector Delta'],
        datasets: [{
            label: 'Temperatura Promedio (°C)',
            data: [540, 610, 490, 680],
            backgroundColor: ['#38bdf8', '#ffffff', '#0284c7', '#93c5fd'],
            borderColor: '#0f172a',
            borderWidth: 2
        }]
    },
    options: { 
        responsive: true, 
        maintainAspectRatio: false,
        animation: {
            duration: 2500,
            easing: 'easeInOutExpo'
        },
        scales: {
            grid: { color: '#1e293b' }
        }
    }
});