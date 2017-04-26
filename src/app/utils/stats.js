import Stats from "stats.js";
module.exports = function () {
    const stats = Stats();
    stats.domElement.style.cssText = 'position:fixed;right:0;bottom:100px;z-index:10000';
    document.body.appendChild(stats.domElement);
    let loop = function () {
        stats.update();
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
};
