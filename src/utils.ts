export function onChange(target: HTMLElement, callback: (mutations: MutationRecord[]) => void) {
    const options = {
        childList: true,
        subtree: true,
    }

    const observer = new MutationObserver((mutations) => {
        observer.disconnect()

        try {
            callback(mutations)
        } finally {
            observer.observe(target, options)
        }
    })

    observer.observe(target, options)

    return observer
}

export function getOrCreateElement(className: string, nodeType: string, parent: HTMLElement) {
    const existingElement = parent.querySelector(`.${className}`) as HTMLElement
    if (existingElement) {
        return existingElement
    }

    const newElement = document.createElement(nodeType)
    newElement.classList.add(className)
    return newElement
}

export function getTimeDifference(startTime: string, endTime: string) {
    const parseTime = (time: string) => {
        if (typeof time !== "string") {
            throw new TypeError("Les hores han de ser strings.");
        }

        const match = time.match(/^([01]?\d|2[0-3]):([0-5]\d)$/);

        if (!match) {
            throw new RangeError(
                `Hora no vàlida: "${time}". Utilitza el format "HH:mm".`,
            );
        }

        const [, hours, minutes] = match;

        return new Date(
            Date.UTC(1970, 0, 1, Number(hours), Number(minutes)),
        );
    };

    const start = parseTime(startTime);
    const end = parseTime(endTime);
    const differenceMs = end.getTime() - start.getTime();

    if (differenceMs < 0) {
        throw new RangeError("L'hora final no pot ser anterior a l'hora inicial.");
    }

    return differenceMs
}

export function millisecondsToHhMm(milliseconds: number) {
    const totalMinutes = Math.floor(milliseconds / 60_000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}min`;
}