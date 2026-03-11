module.exports = function(eleventyConfig) {

  // Copy static assets
  eleventyConfig.addPassthroughCopy("assets");
  // eleventyConfig.addPassthroughCopy({"content/robots.txt": "robots.txt"});
  eleventyConfig.addPassthroughCopy("robots.txt");

  // Watch for changes
  eleventyConfig.addWatchTarget("assets/css/");
  eleventyConfig.addWatchTarget("assets/js/");

  // Date filter for sitemap
  eleventyConfig.addFilter("dateToRfc3339", function(dateObj) {
    return new Date(dateObj).toISOString();
  });

  eleventyConfig.addFilter("dateFormat", function(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  });

  // Collections
  eleventyConfig.addCollection("waterReviews", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/reviews/water/*.md");
  });

  eleventyConfig.addCollection("outdoorReviews", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/reviews/outdoor/*.md");
  });

  eleventyConfig.addCollection("kitchenReviews", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/reviews/kitchen/*.md");
  });

  eleventyConfig.addCollection("allReviews", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/reviews/**/*.md")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "content",
      output: "_site",
      includes: "../_includes",
      data: "../_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
