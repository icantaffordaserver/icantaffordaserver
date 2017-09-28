import React, { Component } from 'react'
import propTypes from 'prop-types'

import { TagUl, TagLi } from './styles'

class TagsComponent extends Component {
  renderTags = () => {
    const tagsData = this.props.tags

    const listOfTags = tagsData.data.tags.map(tags => {
      return <TagLi key={tags.tag}>#{tags.tag}</TagLi>
    })
    return listOfTags
  }
  render() {
    const TagsList = this.renderTags()
    return <TagUl>{TagsList}</TagUl>
  }
}

export default TagsComponent
