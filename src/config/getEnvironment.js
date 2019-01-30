/**
 * @param {{}} environments
 * @return {Readonly<{}>}
 */
export default function (environments) {
    const environment = Object
        .entries(environments)
        // Sort environments by priority
        .sort((a, b) => {
            return a[1].priority - b[1].priority
        })
        .reduce((prev, [key, env]) => {
            if (prev === null) {
                let isSameHref;
                if (env.url.subdirectory) {
                    const url = new URL(`${env.url.base}${env.url.subdirectory}`);
                    isSameHref = url.host === location.host && location.pathname.includes(url.pathname);
                } else {
                    const url = new URL(env.url.base);
                    isSameHref = url.host === location.host;
                }
                // Default is development env
                if (isSameHref || key === 'development') return env;
            }
            return prev
        }, null);
    return Object.freeze(environment);
}
