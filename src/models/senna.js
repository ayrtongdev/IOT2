import * as tf from '@tensorflow/tfjs';


async function runModel() {
    const model = await tf.loadLayersModel('path/to/model/model.json');
    const input = tf.tensor2d([[1, 2, 3, 4]], [1, 4]);
    const output = model.predict(input);
    console.log(output.dataSync());
  }

  
 
