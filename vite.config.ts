import { defineConfig } from "vitest/config"

export default defineConfig(({ command, mode}) => {
    return ({
        base: "",
        server: {
            port: 3000,
            open: true,
            watch: {
                usePolling: true
            }
        },
    })
})