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
        .then(buffer => {
            Array.isArray(buffer) // => true
            // as a stream
            return chartNode.getImageStream('image/png');
        })
        .then(streamResult => {
            // using the length property you can do things like
            // directly upload the image to s3 by using the
            // stream and length properties
            streamResult.stream // => Stream object
            streamResult.length // => Integer length of stream
            // write to a file
            return chartNode.writeImageToFile('image/png', './testimage.png');
        })
        .then(() => {
            // chart is now written to the file path
            // ./testimage.png
            res.status(200).json({message: 'ok'})
        })
        .catch(e => {
            console.error("There was an error", e)
            res.status(500).json(e)
        });

    }
}