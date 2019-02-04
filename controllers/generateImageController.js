const ChartjsNode = require('chartjs-node')

module.exports = {
    generateImage: (req, res) => {
        const chartJsOptions = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [10, 20, 30]
                }],
            
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Red',
                    'Yellow',
                    'Blue'
                ]
            },
            options: {}
        }
        
        let chartNode = new ChartjsNode(600, 600);
        return chartNode.drawChart(chartJsOptions)
        .then(() => {
            console.log('chart created!!!')
            // chart is created
        
            // get image as png buffer
            return chartNode.getImageBuffer('image/png');
        })
        .then((buffer) => {
            // chart is now written to the file path
            // ./testimage.png
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': buffer.length
            })
            res.end(buffer)
        })
        .catch(e => {
            console.error("There was an error", e)
            res.status(500).json(e)
        });

    }
}