import React, { Component } from 'react'
import propTypes from 'prop-types'

import { TagUl, TagLi } from './styles'

class TagsComponent extends Component {
  renderTags = () => {
    const tagsData = this.props.tags

    const listOfTags = tagsData.data.tags.map(tag => {
      return <TagLi key={tag.tag}>#{tag.tag}</TagLi>
    })
    return listOfTags
  }
  render() {
    const tagsList = this.renderTags()
    return <TagUl>{tagsList}</TagUl>
  }
}

export default TagsComponent
