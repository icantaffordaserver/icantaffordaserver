import React, { Component } from 'react'
import propTypes from 'prop-types'

class TagsComponent extends Component {
  renderTags = () => {
    const tagsData = this.props.tags
    console.log(tagsData.data.tags)
    const listOfTags = tagsData.data.tags.map(tag => {
      return <li key={tag.tag}>{tag.tag}</li>
    })
    return listOfTags
  }
  render() {
    const tagsList = this.renderTags()
    return <TagUl>{tagsList}</TagUl>
  }
}

export default TagsComponent
