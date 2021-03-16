module.exports = {
    lintOnSave: false,
    devServer: {
        '/todo': { target: 'http://localhost:8080', changeOrigin: true }
    }
}

