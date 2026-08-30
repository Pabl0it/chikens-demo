const metricsDatabase = {
    1: { name: "Extracción Total", unit: "kT", type: "line", base: 9842.10 },
    2: { name: "Extracción Prom. Diaria", unit: "kT", type: "bar", base: 89.45 },
    3: { name: "Extracción Máx. Diaria", unit: "kT", type: "line", base: 142.10 },
    4: { name: "Extracción Mín. Diaria", unit: "kT", type: "bar", base: 33.20 },
    5: { name: "Ingresos Totales", unit: "M ⌬", type: "line", base: 5430.80 },
    6: { name: "Ingreso Prom. Diario", unit: "M ⌬", type: "bar", base: 54.30 },
    7: { name: "Ingreso Máx. Diario", unit: "M ⌬", type: "line", base: 88.50 },
    8: { name: "Margen Ganancia / kT", unit: "M ⌬", type: "bar", base: 1.45 },
    9: { name: "Eficiencia Motores", unit: "%", type: "line", base: 99.15 },
    10: { name: "Temp. Prom. Núcleo", unit: "°C", type: "bar", base: 740.10 },
    11: { name: "Temp. Máx. Registrada", unit: "°C", type: "line", base: 989.50 },
    12: { name: "Consumo Energético Tot.", unit: "MW", type: "bar", base: 32100.00 },
    13: { name: "Consumo Promedio", unit: "MW", type: "line", base: 321.00 },
    14: { name: "Promedio Drones Activos", unit: "Un", type: "bar", base: 340.50 },
    15: { name: "Máximo Drones Despl.", unit: "Un", type: "line", base: 510 },
    16: { name: "Fugas Totales Reg.", unit: "Alertas", type: "bar", base: 19 },
    17: { name: "Días sin Fugas", unit: "Días", type: "line", base: 12 },
    18: { name: "Tasa Fugas Crítica", unit: "%", type: "bar", base: 12.80 },
    19: { name: "Días en Estado Óptimo", unit: "Días", type: "line", base: 45 },
    20: { name: "Días en Mantenimiento", unit: "Días", type: "bar", base: 8 }
};

let chartV1Instance = null;
let chartV2Instance = null;

window.addEventListener('DOMContentLoaded', () => {
    cargarMetricaEnVentana(1, 'V1');
    cargarMetricaEnVentana(5, 'V2');
});

function cargarMetricaEnVentana(idMetrica, ventanaDestino) {
    const metrica = metricsDatabase[idMetrica];
    if (!metrica) return;

    const labels = ['Node 1', 'Node 2', 'Node 3', 'Node 4', 'Node 5', 'Node 6'];
    const valores = [
        Number((metrica.base * 0.65).toFixed(2)),
        Number((metrica.base * 0.82).toFixed(2)),
        Number((metrica.base * 1.15).toFixed(2)),
        Number((metrica.base * 0.95).toFixed(2)),
        Number((metrica.base * 1.08).toFixed(2)),
        Number(metrica.base.toFixed(2))
    ];

    if (ventanaDestino === 'V1') {
        document.getElementById('tituloV1').textContent = `V1: ${metrica.name.toUpperCase()} (${metrica.unit})`;
        const ctx = document.getElementById('chartV1').getContext('2d');
        
        if (chartV1Instance) chartV1Instance.destroy();

        chartV1Instance = new Chart(ctx, {
            type: metrica.type,
            data: {
                labels: labels,
                datasets: [{
                    label: `${metrica.name} (${metrica.unit})`,
                    data: valores,
                    borderColor: '#d946ef',
                    backgroundColor: metrica.type === 'line' ? 'rgba(217, 70, 239, 0.2)' : '#d946ef',
                    borderWidth: 2,
                    fill: metrica.type === 'line',
                    tension: 0.2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e1b4b' } },
                    y: { ticks: { color: '#94a3b8' }, grid: { color: '#1e1b4b' } }
                }
            }
        });
    } else if (ventanaDestino === 'V2') {
        document.getElementById('tituloV2').textContent = `V2: ${metrica.name.toUpperCase()} (${metrica.unit})`;
        const ctx = document.getElementById('chartV2').getContext('2d');
        
        if (chartV2Instance) chartV2Instance.destroy();

        chartV2Instance = new Chart(ctx, {
            type: metrica.type === 'line' ? 'bar' : 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${metrica.name} (${metrica.unit})`,
                    data: valores,
                    borderColor: '#06b6d4',
                    backgroundColor: metrica.type === 'line' ? '#06b6d4' : 'rgba(6, 182, 212, 0.25)',
                    borderWidth: 2,
                    fill: metrica.type !== 'line',
                    tension: 0.2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { ticks: { color: '#94a3b8' }, grid: { color: '#0e1e2d' } },
                    y: { ticks: { color: '#94a3b8' }, grid: { color: '#0e1e2d' } }
                }
            }
        });
    }
}