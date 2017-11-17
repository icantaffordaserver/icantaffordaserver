import React from 'react'

import {
  Content,
  ColumnContainer,
  Section,
  Card,
  Title,
  Subheading,
  Tag,
  Text,
  TextLink,
} from '../../../../styles'

import { Modal } from 'semantic-ui-react'

export default props => {
  return (
    <Modal basic trigger={props.trigger}>
      <ColumnContainer>
        <Section inline gray>
          <Card row>
            <img
              src={
                'https://api.adorable.io/avatars/285/' +
                props.user.email +
                '.png'
              }
              alt=""
            />
            <div style={{ marginLeft: '1em' }}>
              <Text>
                <b style={{ marginRight: '10px', fontSize: '1.5em' }}>
                  {props.user.firstName} {props.user.lastName}
                </b>{' '}
                {props.user.location}
              </Text>
              <hr />
              <Section inline>
                <Tag>#Stuff</Tag>
                <Tag>#That</Tag>
                <Tag>#I</Tag>
                <Tag>#Like</Tag>
              </Section>
              <Text left>{props.user.bio}</Text>
            </div>
          </Card>
        </Section>
        <Section inline gray>
          <ColumnContainer>
            <Card>
              <Text left small>
                <Title darkGray left fullWidth small>
                  What do you think about stuff?
                </Title>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </Card>
          </ColumnContainer>
          <ColumnContainer>
            <Card>
              <Text left small>
                <Title darkGray left fullWidth small>
                  What do you think about stuff?
                </Title>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </Card>
          </ColumnContainer>
        </Section>
      </ColumnContainer>
    </Modal>
  )
}
