document.addEventListener('DOMContentLoaded', function () {
  const chartContainer = document.getElementById('chart');
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Function to generate the contributions chart
function generateChart() {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const passedDays = Math.floor((currentDate - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

  chartContainer.innerHTML = '';
  let dayCounter = 1;

  months.forEach((month, index) => {
    const daysInMonth = new Date(currentDate.getFullYear(), index + 1, 0).getDate();

    const monthRow = document.createElement('div');
    monthRow.classList.add('month-row');

    const monthName = document.createElement('div');
    monthName.classList.add('month-name');
    monthName.textContent = month;
    monthRow.appendChild(monthName);

    for (let i = 1; i <= daysInMonth; i++, dayCounter++) {
      const day = document.createElement('div');
      day.classList.add('day');
      if (dayCounter <= passedDays) {
        day.classList.add('passed');
      } else {
        day.classList.add('remaining');
      }
      monthRow.appendChild(day);
    }

    chartContainer.appendChild(monthRow);
  });
}
  
  // Generate the contributions chart
  generateChart();
});