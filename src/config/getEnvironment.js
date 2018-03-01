import { isEqual } from "lodash";

/**
 * @param {String} path
 */
function getPathValues(path) {
    return path
        .split("/")
        .filter((val, i) => val !== "" || (val === "" && i === 0));
}

/**
 * @param {String} pathA
 * @param {String} pathB
 * @returns {Boolean}
 */
function equalPaths(pathA, pathB) {
    const a = getPathValues(pathA);
    const b = getPathValues(pathB);
    return isEqual(a, b);
}

/**
 * @param {{}} environments
 * @return {Readonly<{}>}
 */
export default function (environments) {
    const environment = Object
        .entries(environments)
        .reduce((prev, [key, env]) => {
            if (Array.isArray(prev)) {
                const url = new URL(`${env.url.base}${env.url.subdirectory}`);
                // Compare hosts and paths. `equalPaths` compares if paths like
                // '/foo/bar' and '/foo/bar/' (note the the last '/') are the same.
                // Comparing url.href with location.href won't work in some cases.
                const isSameHref = url.host === location.host && equalPaths(url.pathname, location.pathname);
                // Default is development env
                if (isSameHref || key === 'development') return env;
            }
            return prev;
        }, []);
    return Object.freeze(environment);
}
