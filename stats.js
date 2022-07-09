javascript:(
    function(){
        const INDEX_LEVEL = 0;
        const INDEX_EC = 2;
        const INDEX_HC = 4;
        const INDEX_EXH = 6;
        const KEY_COUNT = 'count';
        const KEY_EC = 'EASY';
        const KEY_HC = 'HARD';
        const KEY_EXH = 'EX-HARD';
        const LEVELS = ['☆11.6', '☆11.8', '☆12.0', '☆12.1', '☆12.2', '☆12.3', '☆12.4', '☆12.5', '☆12.6', '☆12.7'];
        let stats = {};
        LEVELS.forEach(level => {
            stats[level] = {[KEY_COUNT]:0, [KEY_EC]:0, [KEY_HC]:0, [KEY_EXH]:0};
        });

        const charts = document.querySelectorAll('tbody:not(.tablesorter-no-sort)%20tr[role="row"]');
        charts.forEach(chart => {
            const level = chart.children[INDEX_LEVEL].innerText;
            const is_ec = chart.children[INDEX_EC].hasChildNodes() && chart.children[INDEX_EC].firstChild.classList.contains('text-success');
            const is_hc = chart.children[INDEX_HC].hasChildNodes() && chart.children[INDEX_HC].firstChild.classList.contains('text-success');
            const is_exh = chart.children[INDEX_EXH].hasChildNodes() && chart.children[INDEX_EXH].firstChild.classList.contains('text-success');

            stats[level][KEY_COUNT] += 1;
            if (is_ec) stats[level][KEY_EC] += 1;
            if (is_hc) stats[level][KEY_HC] += 1;
            if (is_exh) stats[level][KEY_EXH] += 1;
        });

        let generate = function (element, type) {
            return `${type}:%20${element[type]}/${element[KEY_COUNT]}%20(${Math.round(element[type]/element[KEY_COUNT]*100*10)/10}%25)`;
        };

        let output = '';
        for (const level in stats) {
            if (Object.hasOwnProperty.call(stats, level)) {
                const element = stats[level];
                output += level + "%20-%20";
                output += generate(element, KEY_EC) + ",%20";
                output += generate(element, KEY_HC) + ",%20";
                output += generate(element, KEY_EXH) + "\n";
            }
        }
        document.querySelector('h5').innerText += "\n" + output;
    }
)();