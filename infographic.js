const ctx = document.getElementById('wineChart').getContext('2d');

const data = {
  labels: ['Italy', 'France', 'Spain', 'USA', 'Argentina', 'Australia'],
  datasets: [{
    label: 'Wine Production (in million hectoliters)',
    data: [47.2, 45.5, 37.8, 24.7, 14.1, 12.3],
    backgroundColor: [
      '#7b3f00', '#a52a2a', '#8b0000', '#b22222', '#cd5c5c', '#e9967a'
    ],
    borderRadius: 6
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
        external: customTooltip
      },
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Million Hectoliters'
        }
      }
    }
  }
};

const wineChart = new Chart(ctx, config);

const tooltip = document.getElementById('tooltip');
const percentages = [18.7, 18.0, 15.0, 9.8, 5.6, 4.8]; // % of global production

function customTooltip(context) {
  const model = context.tooltip;
  if (model.opacity === 0) {
    tooltip.classList.add('hidden');
    return;
  }

  const position = context.chart.canvas.getBoundingClientRect();
  const index = model.dataPoints[0].dataIndex;
  const country = data.labels[index];
  const value = data.datasets[0].data[index];
  const percent = percentages[index];

  tooltip.innerHTML = `<strong>${country}</strong><br>${value}M HL<br>${percent}% of global production`;
  tooltip.style.left = `${model.caretX + position.left}px`;
  tooltip.style.top = `${model.caretY + position.top}px`;
  tooltip.classList.remove('hidden');
}

