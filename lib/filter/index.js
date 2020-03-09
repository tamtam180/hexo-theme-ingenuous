module.exports = function (hexo) {
    const urlFn = require('url');
    const cheerio = require('cheerio');
    //let cheerio;
    hexo.extend.filter.register('after_post_render', function(data) {
        if (data.layout != 'post') {
            return;
        }
        // case of no photos in front matter
        let images = data.photos.slice();
        if (!images.length && data.content) {
            const $ = cheerio.load(data.content);
            $('img').each(function() {
                const src = $(this).attr('src');
                if (src) images.push(src);
            });
        }
        // convert to full url
        images = images.map(function(path) {
            if (!urlFn.parse(path).host) {
                return urlFn.resolve(hexo.config.url, path);
            }
            return path;
        });
        data.ext_photos = images;
        data.ext_photo = images[0];
    });
};
