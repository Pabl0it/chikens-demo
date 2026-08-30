const metricsDatabase = {
    1: { name: "Extracción Total", unit: "kT", type: "line", base: 2880.72 },
    2: { name: "Extracción Prom. Diaria", unit: "kT", type: "bar", base: 28.81 },
    3: { name: "Extracción Máx. Diaria", unit: "kT", type: "line", base: 49.48 },
    4: { name: "Extracción Mín. Diaria", unit: "kT", type: "bar", base: 10.22 },
    5: { name: "Ingresos Totales", unit: "M ⌬", type: "line", base: 1495.66 },
    6: { name: "Ingreso Prom. Diario", unit: "M ⌬", type: "bar", base: 14.96 },
    7: { name: "Ingreso Máx. Diario", unit: "M ⌬", type: "line", base: 24.71 },
    8: { name: "Margen Ganancia / kT", unit: "M ⌬", type: "bar", base: 0.52 },
    9: { name: "Eficiencia Motores", unit: "%", type: "line", base: 92.25 },
    10: { name: "Temp. Prom. Núcleo", unit: "°C", type: "bar", base: 571.90 },
    11: { name: "Temp. Máx. Registrada", unit: "°C", type: "line", base: 746.68 },
    12: { name: "Consumo Energético Tot.", unit: "MW", type: "bar", base: 20320.92 },
    13: { name: "Consumo Promedio", unit: "MW", type: "line", base: 203.21 },
    14: { name: "Promedio Drones Activos", unit: "Un", type: "bar", base: 100.59 },
    15: { name: "Máximo Drones Despl.", unit: "Un", type: "line", base: 148 },
    16: { name: "Fugas Totales Reg.", unit: "Alertas", type: "bar", base: 16 },
    17: { name: "Días sin Fugas", unit: "Días", type: "line", base: 86 },
    18: { name: "Tasa Fugas Crítica", unit: "%", type: "bar", base: 14.00 },
    19: { name: "Días en Estado Óptimo", unit: "Días", type: "line", base: 65 },
    20: { name: "Días en Mantenimiento", unit: "Días", type: "bar", base: 9 }
};

let chartV1Instance = null;
let chartV2Instance = null;

// Inicializamos cargando por defecto dos métricas al arrancar
window.addEventListener('DOMContentLoaded', () => {
    cargarMetricaEnVentana(1, 'V1');
    cargarMetricaEnVentana(5, 'V2');
});

function cargarMetricaEnVentana(idMetrica, ventanaDestino) {
    const metrica = metricsDatabase[idMetrica];
    if (!metrica) return;

    // Generamos puntos de tendencia simulados según el valor base de la tarjeta
    const labels = ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4', 'Fase 5', 'Fase 6'];
    const valores = [
        Number((metrica.base * 0.75).toFixed(2)),
        Number((metrica.base * 0.88).toFixed(2)),
        Number((metrica.base * 0.94).toFixed(2)),
        Number((metrica.base * 1.03).toFixed(2)),
        Number((metrica.base * 0.92).toFixed(2)),
        Number(metrica.base.toFixed(2))
    ];

    if (ventanaDestino === 'V1') {
        document.getElementById('tituloV1').textContent = `> V1: ${metrica.name.toUpperCase()} (${metrica.unit})`;
        const ctx = document.getElementById('chartV1').getContext('2d');
        
        if (chartV1Instance) chartV1Instance.destroy();

        chartV1Instance = new Chart(ctx, {
            type: metrica.type,
            data: {
                labels: labels,
                datasets: [{
                    label: `${metrica.name} (${metrica.unit})`,
                    data: valores,
                    borderColor: '#0284c7',
                    backgroundColor: metrica.type === 'line' ? 'rgba(2, 132, 199, 0.15)' : '#0284c7',
                    borderWidth: 3,
                    fill: metrica.type === 'line',
                    tension: 0.2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 600 },
                scales: {
                    grid: { color: '#e2e8f0' },
                    ticks: { color: '#0f172a' }
                }
            }
        });
    } else if (ventanaDestino === 'V2') {
        document.getElementById('tituloV2').textContent = `> V2: ${metrica.name.toUpperCase()} (${metrica.unit})`;
        const ctx = document.getElementById('chartV2').getContext('2d');
        
        if (chartV2Instance) chartV2Instance.destroy();

        chartV2Instance = new Chart(ctx, {
            type: metrica.type === 'line' ? 'bar' : 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${metrica.name} (${metrica.unit})`,
                    data: valores,
                    borderColor: '#0e7490',
                    backgroundColor: metrica.type === 'line' ? '#0e7490' : 'rgba(14, 116, 144, 0.25)',
                    borderWidth: 3,
                    fill: metrica.type !== 'line',
                    tension: 0.2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 600 },
                scales: {
                    grid: { color: '#e2e8f0' },
                    ticks: { color: '#0f172a' }
                }
            }
        });
    }
}