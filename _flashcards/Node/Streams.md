# Streams

readableSreamfs.createReadStream('file.txt') creates a readable stream in static
state.

Attach end event listener first:

readableStream.on('end', callback)

Attaching data callback

readableStream.on('data', callback) starts the stream.
