const container = document.querySelector('.chart__container')

let values = []
// use fetch instead import for compatibility isues with firefox
fetch("../expenses-chart-component/data.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(data => values.push(data.amount))
        let maxValue = Math.max(...values)
        const chartsContentHTML = data.map(chart  => `

        <div class="chart__bar-container">
        <div class="chart__bar--day">${chart.day}</div>
          
            <div class="chart__bar" 
            style="height:${(chart.amount * 100) / maxValue}%; 
            background-color: ${(chart.amount % maxValue == 0)  ? "var(--Cyan)" :  "var(--Soft-red)"};">
            <div class="chart__bar--label">$${chart.amount}</div>
            </div>
            
        
          </div>
        `).join('')
        container.innerHTML = chartsContentHTML;
    })
    .catch(error => {
        console.error('Error loading JSON file', error)
    })

