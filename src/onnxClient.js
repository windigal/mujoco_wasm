import * as ortImport from 'onnxruntime-web';
const ort = ortImport.default || ortImport;

// 2. 启用多线程：
// 设置为 0 或不设置，让它自动根据 CPU 核心数决定，或者手动设为 4
ort.env.wasm.numThreads = 1;

// 3. 启用 Proxy (多线程模式建议开启)
ort.env.wasm.proxy = false;

let session = null;
let inputName = null;
let outputName = null;

export async function initOnnxModel(url) {
    console.log(`Loading ONNX Model from: ${url} with threading enabled...`);

    try {
        // 创建 Session，允许多线程
        session = await ort.InferenceSession.create(url);
        console.log('✅ ONNX model loaded successfully (Threaded Mode)');
        const inputs = session.inputNames;
        const outputs = session.outputNames;
        inputName = inputs.length > 0 ? inputs[0] : null;
        outputName = outputs.length > 0 ? outputs[0] : null;
        
    } catch (e) {
        console.error("❌ ONNX init failed:", e);
        throw e;
    }
}

export async function runOnnx(obsFloat32Array, shape = [1, obsFloat32Array.length]) {
    if (!session) { throw new Error('ONNX session not initialized'); }
    const inputTensor = new ort.Tensor('float32', obsFloat32Array, shape);
    const feeds = {};
    feeds[inputName] = inputTensor;
    const out = await session.run(feeds);
    return out[outputName].data;
}