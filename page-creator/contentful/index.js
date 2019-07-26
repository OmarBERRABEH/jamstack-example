/**
 * 
 * @description create a pages from contentful source
 * 
 * @author Omar BERRABEH   
 * 
 * @license Omar BERRABEH
 * 
 */

const path = require (`path`);

const contentfulPageCreator = async ({graphql, actions}) => {
  const {createPage} = actions;
  // template post for contentful
  const contentfulPostComponent = path.resolve (
    './src/templates/contentful-post.js'
  );

  const result = await graphql (
    `
      {
        allContentfulPost {
          edges {
            node {
              id
              slug,
              title
              subtitle
               image{
                fluid {
                  src
                }
              }
              content {
                json
              }
              author
              contentful_id
              createdAt
              image {
                id
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

  console.log (
    'result.data',
    Object.keys (result.data.allContentfulPost.edges)
  );

  const posts = result.data.allContentfulPost.edges;

  posts.forEach ((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;
    console.log ('omar', post.node.slug);
    createPage ({
      path: post.node.slug,
      component: contentfulPostComponent,
      context: {
        slug: post.node.slug,
        previous,
        next,
        datea: {
          post,
        },
      },
    });
  });
};

exports.contentfulPageCreator = contentfulPageCreator;
