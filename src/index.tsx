import { createRoot } from "react-dom/client"
import { App } from './App'

import "./styles/main.scss"
import "./styles/styles.scss"

const root = createRoot(document.getElementById("app")!)

root.render(<App />)