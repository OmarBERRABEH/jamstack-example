/**
 * 
 * @description create markDown pages
 * 
 * @author Omar BERRABEH
 * 
 * @license Omar BERRABEh
 */

const path = require (`path`);

const markdownPageCreator = async ({graphql, actions}) => {
  const {createPage} = actions;

  const blogPost = path.resolve (`./src/templates/blog-post.js`);
  const result = await graphql (
    `
        {
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1000
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `
  );
  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach ((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    console.log (
      '`markdown${post.node.fields.slug}',
      `markdown${post.node.fields.slug}`
    );
    createPage ({
      path: `s${post.node.fields.slug}`,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });
};

exports.markdownPageCreator = markdownPageCreator;
