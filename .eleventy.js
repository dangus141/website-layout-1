module.exports = function (eleventyConfig) {

  // --- 1. FILTERS ---

  // Your stripSlash filter
  eleventyConfig.addFilter("stripSlash", (url) => {
    if (typeof url !== "string") return url;
    return url.startsWith("/") ? url.substring(1) : url;
  });

  // Your readableDate filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "Date not available";
    return new Date(dateObj).toLocaleDateString();
  });

  // The Excerpt filter 
  eleventyConfig.addFilter("excerpt", (post) => {
    if (!post) return "";
    const content = post.replace(/(<([^>]+)>)/gi, ""); // Remove HTML tags
    return content.substr(0, content.lastIndexOf(" ", 200)) + "..."; 
  });


  // --- 2. SETTINGS & PASSTHROUGH ---

  eleventyConfig.setQuietMode(true);
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");
  eleventyConfig.setUseGitIgnore(false);
  
  // This ensures your images are copied to the output folder
  eleventyConfig.addPassthroughCopy({ "src/public": "/" });
  
  eleventyConfig.setTemplateFormats(["html", "njk", "txt", "js", "css", "xml", "json", "md"]);

  // --- 3. RETURN CONFIG ---

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk", // Added this so Nunjucks works inside Markdown files
    dir: {
      input: "content",
      includes: "_includes",
      output: "public",
    },
  };

  //
};
