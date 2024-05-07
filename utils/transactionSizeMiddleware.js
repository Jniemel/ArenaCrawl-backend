export function reqSize(req, res, next) {
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  });
  req.on('end', () => {
    body = Buffer.concat(body);
    const sizeInBytes = Buffer.byteLength(body);
    if (sizeInBytes < 0) {
      console.log(`Request size: ${sizeInBytes} bytes`);
    }
  });
  next();
}

export function sendSize(req, res, next) {
  // Capture the original res.send function
  const originalSend = res.send;

  // Override res.send temporarily
  res.send = function logSize(body) {
    console.log(`Sending ${Buffer.byteLength(body) || 0} bytes of data`);

    // Apply the original send method to send the response properly
    originalSend.call(res, body);

    // Restore the original send method immediately after sending
    res.send = originalSend;
  };
  next();
}
