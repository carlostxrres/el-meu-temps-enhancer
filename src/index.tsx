import cssGlobal from "@/css/global.css";
import { getOrCreateElement, onChange } from "@/utils"
import { hydrate } from "preact"
import Timespan from "@/components/Timespan" // muted as if it was not being used

// Add global styles
GM_addStyle(cssGlobal);

// Mount the app
onChange(document.body, () => {
    const nodes = document.querySelectorAll(".fc-time") as NodeListOf<HTMLElement>
    Array.from(nodes).forEach(timeNode => {
        const time = timeNode.getAttribute("data-full")
        if (!time) {
            return null
        }

        const [start, end] = time.split(" - ")
        if (!start || !end) {
            return null
        }

        console.log("hydrating")
        hydrate(<Timespan start={start} end={end} />, timeNode) // 'Timespan' refers to a value, but is being used as a type here. Did you mean 'typeof Timespan'?
        const timespanNode = getOrCreateElement("timespan", "small", timeNode)
        timeNode.appendChild(timespanNode)
    })
})