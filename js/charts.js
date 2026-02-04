/**
 * INTERACTIVE CHARTS LOGIC
 */

function initCharts() {
    // Common theme colors
    const goldColor = '#C7AB6B';
    const darkBg = '#1a2332';

    // 1. Performance Charts (Line)
    const performanceCharts = document.querySelectorAll('.performance-chart-canvas');
    performanceCharts.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        const chartType = canvas.dataset.type || 'balanced';

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(199, 171, 107, 0.4)');
        gradient.addColorStop(1, 'rgba(199, 171, 107, 0)');

        // Sample data
        const dataMap = {
            balanced: [25, 28, 35, 32, 38, 45, 42, 48, 55, 52, 60, 65],
            aggressive: [45, 40, 55, 50, 65, 75, 70, 85, 95, 90, 105, 115],
            conservative: [25, 26, 28, 27.5, 29, 31, 30.5, 33, 35, 34.5, 36, 38]
        };

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                datasets: [{
                    label: 'Доходность (%)',
                    data: dataMap[chartType] || dataMap.balanced,
                    borderColor: goldColor,
                    backgroundColor: gradient,
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: goldColor,
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: darkBg,
                        titleColor: '#fff',
                        bodyColor: goldColor,
                        borderColor: 'rgba(199, 171, 107, 0.3)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function (context) {
                                return context.parsed.y + '% доходность';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            font: { size: 12 }
                        }
                    },
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            font: { size: 12 },
                            callback: value => value + '%'
                        }
                    }
                }
            }
        });
    });

    // 2. Asset Allocation Charts (Doughnut)
    const assetCharts = document.querySelectorAll('.asset-chart-canvas');
    assetCharts.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        const assetData = JSON.parse(canvas.dataset.assets || '[80, 20]');
        const assetLabels = JSON.parse(canvas.dataset.labels || '["Акции", "Фонды"]');

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: assetLabels,
                datasets: [{
                    data: assetData,
                    backgroundColor: [goldColor, 'rgba(199, 171, 107, 0.15)'],
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: darkBg,
                        titleColor: '#fff',
                        bodyColor: goldColor,
                        borderColor: 'rgba(199, 171, 107, 0.3)',
                        borderWidth: 1,
                        padding: 10
                    }
                }
            }
        });
    });
}

// Initialize when Chart.js is loaded
if (typeof Chart !== 'undefined') {
    initCharts();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        const checkChart = setInterval(() => {
            if (typeof Chart !== 'undefined') {
                initCharts();
                clearInterval(checkChart);
            }
        }, 100);
        setTimeout(() => clearInterval(checkChart), 5000);
    });
}
