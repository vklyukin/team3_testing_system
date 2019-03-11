Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

const BASE_PATH = 'http://localhost:5000/';

const getData = () => {
    var countPie_one = 0;
    var dataPie_one = [0, 0, 0, 0, 0, 0];
    var dataLine_one = [0, 0, 0, 0, 0, 0];
    var dataRemoved = [0, 0];
    fetch(BASE_PATH + 'api/mark/', {
        method: 'get'
    }).then(function (response) {
        return response.json(); //reading request like a json object
    }).then(function (json) {
        for (let i = 0; i < json.length; ++i) {
            countPie_one += 1;
            switch (json[i].level) {
                case "A1":
                    dataLine_one[0] += 1;
                    dataPie_one[0] += 1;
                    break;
                case "A2":
                    dataLine_one[1] += 1;
                    dataPie_one[1] += 1;
                    break;
                case "B1":
                    dataLine_one[2] += 1;
                    dataPie_one[2] += 1;
                    break;
                case "B2":
                    dataLine_one[3] += 1;
                    dataPie_one[3] += 1;
                    break;
                case "C1":
                    dataLine_one[4] += 1;
                    dataPie_one[4] += 1;
                    break;
                case "C2":
                    dataLine_one[5] += 1;
                    dataPie_one[5] += 1;
                    break;
                default:
                    break;
            }
            if (json[i].removed) {
                dataRemoved[0] += 1;
            } else {
                dataRemoved[1] += 1;
            }
        }
        var student_count = dataRemoved[0] + dataRemoved[1];
        dataRemoved[0] = ((dataRemoved[0] / student_count) * 100).toFixed(2);
        dataRemoved[1] = ((dataRemoved[1] / student_count) * 100).toFixed(2);
        dataPie_one[0] = ((dataPie_one[0] / countPie_one) * 100).toFixed(2);
        dataPie_one[1] = ((dataPie_one[1] / countPie_one) * 100).toFixed(2);
        dataPie_one[2] = ((dataPie_one[2] / countPie_one) * 100).toFixed(2);
        dataPie_one[3] = ((dataPie_one[3] / countPie_one) * 100).toFixed(2);
        dataPie_one[4] = ((dataPie_one[4] / countPie_one) * 100).toFixed(2);
        dataPie_one[5] = ((dataPie_one[5] / countPie_one) * 100).toFixed(2);
        var ctx = document.getElementById("myAreaChart");
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["A1", "A2", "B1", "B2", "C1", "C2"],
                datasets: [{
                    label: "Student(s)",
                    lineTension: 0.3,
                    backgroundColor: "rgba(78, 115, 223, 0.05)",
                    borderColor: "rgba(78, 115, 223, 1)",
                    pointRadius: 3,
                    pointBackgroundColor: "rgba(78, 115, 223, 1)",
                    pointBorderColor: "rgba(78, 115, 223, 1)",
                    pointHoverRadius: 3,
                    pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                    pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                    pointHitRadius: 10,
                    pointBorderWidth: 2,
                    data: dataLine_one,
                }],
            },
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        right: 25,
                        top: 25,
                        bottom: 0
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            maxTicksLimit: 7,
                            stepSize: 1
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 5,
                            padding: 10,
                            callback: function (value, index, values) {
                                return value;
                            }
                        },
                        gridLines: {
                            color: "rgb(234, 236, 244)",
                            zeroLineColor: "rgb(234, 236, 244)",
                            drawBorder: false,
                            borderDash: [2],
                            zeroLineBorderDash: [2]
                        }
                    }],
                },
                legend: {
                    display: false
                },
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    titleMarginBottom: 10,
                    titleFontColor: '#6e707e',
                    titleFontSize: 14,
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    intersect: false,
                    mode: 'index',
                    caretPadding: 10,
                    callbacks: {
                        label: function (tooltipItem, chart) {
                            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                            return tooltipItem.yLabel + " " + datasetLabel;
                        }
                    }
                }
            }
        });
        var ctx2 = document.getElementById("myPieChart");
        var myPieChart = new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ["A1", "A2", "B1", "B2", "C1", "C2"],
                datasets: [{
                    data: dataPie_one,
                    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#db4c4c', '#eae869', '#ff82fc'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#ba2323', '#fffb1e', '#ff05f9'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: false
                },
                cutoutPercentage: 80,
            },
        });
        var ctx4 = document.getElementById("myPieChart2");
        var myPieChart2 = new Chart(ctx4, {
            type: 'doughnut',
            data: {
                labels: ["Removed", "Finished"],
                datasets: [{
                    data: dataRemoved,
                    backgroundColor: ['#4e73df', '#1cc88a'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: false
                },
                cutoutPercentage: 80,
            },
        });
    });
};
