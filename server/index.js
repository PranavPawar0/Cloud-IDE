const http = require('http');
const express = require('express');
const fs = require('fs/promises');
const { Server: SocketServer } = require('socket.io');
const path = require('path');
const cors = require('cors');
const chokidar = require('chokidar');
const pty = require('node-pty');

// Spawn the pty process for bash
const ptyProcess = pty.spawn('cmd.exe', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.INIT_CWD + '/user',
    env: process.env
});


// Initialize the Express app
const app = express();
const server = http.createServer(app);
const io = new SocketServer({
    cors: '*',
});

// Middleware
app.use(cors());

// Attach socket.io to the server
io.attach(server);

// Watch for file changes in the ./user directory
chokidar.watch('./user').on('all', (event, filePath) => {
    console.log(`File change detected: ${event} on ${filePath}`);
    io.emit('file:refresh', filePath);
});

// Emit terminal data to connected clients
ptyProcess.onData(data => {
    io.emit('terminal:data', data);
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Emit initial file refresh event
    socket.emit('file:refresh');

    // Handle file changes from client
    socket.on('file:change', async ({ path, content }) => {
        try {
            await fs.writeFile(`./user${path}`, content);
            console.log(`File updated: ./user${path}`);
        } catch (error) {
            console.error(`Error writing file: ${error.message}`);
            socket.emit('error', { message: 'File write failed' });
        }
    });

    // Handle terminal input from client
    socket.on('terminal:write', (data) => {
        console.log(`Terminal input received: ${data}`);
        ptyProcess.write(data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});

// Serve file tree structure
app.get('/files', async (req, res) => {
    try {
        const fileTree = await generateFileTree('./user');
        return res.json({ tree: fileTree });
    } catch (error) {
        console.error(`Error generating file tree: ${error.message}`);
        res.status(500).json({ message: 'Failed to generate file tree' });
    }
});

// Serve file content
app.get('/files/content', async (req, res) => {
    const filePath = req.query.path;
    try {
        const content = await fs.readFile(`./user${filePath}`, 'utf-8');
        return res.json({ content });
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        res.status(500).json({ message: 'Failed to read file content' });
    }
});

// Start the server
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log(`🐳 Docker server running on port ${PORT}`));

// Graceful exit on server shutdown
process.on('SIGINT', () => {
    console.log('Shutting down gracefully...');
    ptyProcess.kill();
    process.exit(0);
});

// Function to generate file tree structure
async function generateFileTree(directory) {
    const tree = {};

    async function buildTree(currentDir, currentTree) {
        const files = await fs.readdir(currentDir);

        for (const file of files) {
            const filePath = path.join(currentDir, file);
            const stat = await fs.stat(filePath);

            if (stat.isDirectory()) {
                currentTree[file] = {};
                await buildTree(filePath, currentTree[file]);
            } else {
                currentTree[file] = null;
            }
        }
    }

    await buildTree(directory, tree);
    return tree;
}
