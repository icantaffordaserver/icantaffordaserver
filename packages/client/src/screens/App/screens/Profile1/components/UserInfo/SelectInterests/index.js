import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import { Tag, Button } from '../../../../../styles'
import {
  Tags,
  SuggestionInput,
  SuggestionWrapper,
  SelectInterestsWrapper,
} from '../../../styles'

import approvedInterestQuery from '../../../../../shared/graphql/queries/allConnectionInterests'

class SelectInterestsComponent extends Component {
  render() {
    if (this.props.data.loading) return null
    const { interests } = this.props.data
    const {
      select,
      onChange,
      suggest,
      save,
      loading,
      interestSuggestion,
      suggestionLoading,
    } = this.props
    return (
      <SelectInterestsWrapper>
        <p>
          Choose your interests: <br />
          <i>Multiple interests can be selected.</i>
        </p>
        <Tags>
          {interests.map((interest, i) => (
            <Tag
              key={i}
              onClick={() => select(interest.id)}
              className={
                this.props.selectedInterests.indexOf(interest.id) > -1 &&
                'selected'
              }
            >
              #{interest.name}
            </Tag>
          ))}
        </Tags>

        <SuggestionWrapper>
          <p>
            Suggest your own interest! <br />
            <i>
              We’ll review your interests and keep adding the popular ones on a
              rolling basis!
            </i>
          </p>
          <SuggestionInput
            name="interestSuggestion"
            value={interestSuggestion}
            onChange={onChange}
          />
          <Button
            small
            accept
            square
            loading={suggestionLoading}
            onClick={suggest}
          >
            Submit
          </Button>
        </SuggestionWrapper>

        <Button round small loading={loading} onClick={save}>
          Save
        </Button>
      </SelectInterestsWrapper>
    )
  }
}

export default graphql(approvedInterestQuery)(SelectInterestsComponent)
