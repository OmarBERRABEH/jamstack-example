import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    console.log('data omar', data);
    const siteTitle = data.site.siteMetadata.title
    const markDownPosts = data.allMarkdownRemark.edges
    const contentfulPosts = data.allContentfulPost.edges

    console.log(contentfulPosts);
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {markDownPosts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
        {contentfulPosts.map(({ node }) => {
          const title = node.title || node.slug
          return (
            <div key={node.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.createdAt}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.content ,
                }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
 query {
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
    edges {
      node {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
  allContentfulPost(sort: {fields: [createdAt], order: DESC}) {
    edges {
      node {
        slug
        title
        content {
          json
        }
        contentful_id
      }
    }
  }
}
`
